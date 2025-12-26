### Resumo rápido do problema

Hoje o **DebounceManager** está agregando todas as mensagens históricas do chat quando monta o prompt para o GPT. Isso faz com que o modelo “re-responda” aquilo que já foi respondido, gerando repetição e mensagens enormes.
O comportamento correto deveria ser:

1. **Durante o intervalo do debounce (7 s)** – concatenar tudo o que chegar para o mesmo `chatId`.
2. **Quando o timer dispara** – enviar **apenas** esse bloco para o GPT, receber a resposta, limpar o buffer e arquivar a conversa normalmente.
3. **Mensagens que chegarem depois disso** iniciam um **novo** buffer; o GPT verá o histórico (para contexto), mas não receberá o mesmo texto duplicado.

---

## Pontos para o dev revisar

| Onde olhar                                                                           | O que conferir                                                                                       | Ajuste sugerido                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **onFlush(chatId, messagesArray)** (camada de orquestração acima do DebounceManager) | Se está montando o prompt somando `messagesArray` **+ alguma coleção global** que nunca é esvaziada. | Na hora de criar o prompt: <br>`js<br>// NÃO faça isso👇<br>prompt = allPreviousMessages.concat(messagesArray)…<br><br>// Faça assim👇<br>prompt = systemContext.concat(messagesArray);<br>`<br>O `systemContext` pode trazer regras fixas e, se quiser, **um resumo** do histórico – mas **não** o texto bruto já respondido. |
| **timer callback** no DebounceManager                                                | Após chamar `onFlush`, o buffer precisa sumir de fato.                                               | Já existem chamadas a `memoryBuffer.delete()` e `redisClient.del()`. Verifique nos logs se elas estão executando. Se algum erro impedir a exclusão, force um `finally` para limpar mesmo em caso de falha.                                                                                                                     |
| **downloadMediaIfExists**                                                            | Pode aumentar muito o prompt se o Base64 da mídia for mandado ao GPT.                                | Não envie o Base64 inteiro. Guarde só um placeholder ou o link para o arquivo.                                                                                                                                                                                                                                                 |
| **Função que cria a requisição GPT**                                                 | Garantir deduplicação por **ID da mensagem**.                                                        | Se precisar manter o histórico completo, armazene `<chatId, messageId>` numa tabela/coleção “já enviado”. Antes de mandar algo novo, faça um `filter` removendo IDs que já foram enviados.                                                                                                                                     |
| **Tamanho do contexto**                                                              | O prompt está crescendo indefinidamente?                                                             | Considere resumir o histórico antigo com embeddings ou “conversation summary” em vez de concatenar tudo.                                                                                                                                                                                                                       |

---

## Passo-a-passo bem objetivo

1. **Limpe o buffer após processar**

   * Já temos `memoryBuffer.delete(chatId)` e `await redisClient.del(key)`; garanta que esses comandos não estejam dentro de um bloco que possa ser pulado por exceção.
   * Adicione um *log* **INFO** confirmando a remoção (“Buffer zerado para chat X”).

2. **Monte o prompt só com o lote atual**

   ```js
   const prompt = [
     { role: 'system', content: systemContext },
     ...messagesArray.map(m => ({ role: 'user', content: m.body }))
   ];
   ```

   > ⚠️ **Não** inclua respostas anteriores da própria IA.

3. **Guarde contexto sem repetir texto**

   * Após receber a `assistant` reply, grave **apenas**: `{role:'assistant', content: resposta}`
   * Na próxima rodada, se quiser contexto, traga **só** esses objetos; não replique de novo a parte do usuário que já foi enviada.

4. **Proteja contra falhas**

   * Se o `onFlush` lançar erro, use `finally` para limpar buffer/timer mesmo assim, evitando “timers órfãos” e dados presos.

```js
try {
  await onFlush(chatId, finalBufferToFlush);
} catch (e) {
  logger.error('Falha no onFlush', e);
} finally {
  await clearBuffers(chatId); // função que deleta Redis/memory e timer
}
```

5. **Teste**

   * Envie três mensagens rápidas (menos de 7 s) → verifique que o GPT recebe **apenas um** prompt com 3 mensagens.
   * Espere a resposta.
   * Envie outra mensagem → o GPT deve responder **só** a esta nova pergunta, sem repetir a anterior.

---

### Frase curtinha para o commit

> “Evita prompt duplicado: zera buffer após flush e envia só o lote do debounce.”

Com esses ajustes o bot continuará lembrando da conversa, mas **não** vai somar respostas antigas no texto que ele devolve.
