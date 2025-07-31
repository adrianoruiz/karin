#!/bin/bash
# Script de instalação do ambiente

echo "🚀 Configurando ambiente para Secretária AI"

# Verificar se Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 não encontrado. Instale Python 3.8+ primeiro."
    exit 1
fi

# Criar ambiente virtual
echo "📦 Criando ambiente virtual..."
python3 -m venv venv
source venv/bin/activate

# Atualizar pip
echo "⬆️ Atualizando pip..."
pip install --upgrade pip

# Instalar dependências
echo "📥 Instalando dependências..."
pip install -r requirements.txt

# Copiar arquivo de configuração
echo "⚙️ Configurando variáveis de ambiente..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Arquivo .env criado. Configure suas chaves de API."
else
    echo "ℹ️ Arquivo .env já existe."
fi

echo "✅ Instalação concluída!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure suas chaves de API no arquivo .env"
echo "2. Configure o PostgreSQL"
echo "3. Execute: python sistema_completo.py"