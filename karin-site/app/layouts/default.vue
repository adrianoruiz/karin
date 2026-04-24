<template>
  <div class="min-h-screen bg-white overflow-x-hidden">
    <div class="fixed top-0 w-full z-50 transition-transform duration-300">
      <NavBar />
    </div>

    <main class="pt-20 md:pt-[102px]">
      <slot />
      <Footer />
    </main>

    <div class="fixed bottom-6 right-6 z-50 animate-pulse-slow">
      <WhatsAppButton />
    </div>

    <TermosModais />
  </div>
</template>
