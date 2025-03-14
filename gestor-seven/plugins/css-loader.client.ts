// Plugin para garantir o carregamento correto do CSS durante as transições de página
export default defineNuxtPlugin((nuxtApp) => {
  // Adicionar evento para garantir que o CSS seja carregado antes da transição de página
  nuxtApp.hook('page:start', () => {
    // Forçar o carregamento do CSS antes da transição
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
      const newLink = document.createElement('link');
      newLink.rel = 'stylesheet';
      newLink.href = link.getAttribute('href') || '';
      newLink.onload = () => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      };
      if (link.parentNode) {
        link.parentNode.insertBefore(newLink, link.nextSibling);
      }
    });
  });

  // Adicionar evento para garantir que o CSS seja carregado após a transição de página
  nuxtApp.hook('page:finish', () => {
    // Forçar a aplicação do CSS após a transição
    setTimeout(() => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
          link.setAttribute('href', href);
        }
      });
    }, 100);
  });
});
