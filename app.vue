  <template>
    <div class="flex min-h-screen">
      <!-- Sidebar (fixed width) -->
      <Sidebar />

      <!-- Main Content Wrapper -->
      <div class="flex flex-col flex-1 ml-[250px] min-h-screen">
        <!-- Fixed Navbar -->
        <div class="fixed top-0 left-[250px] w-[calc(100%-250px)] bg-gray-800 py-4 px-6 z-10 shadow-md">
          <Navbar />
        </div>

        <!-- Page Content (with margin for navbar and footer) -->
        <main class="flex-1 mt-[64px] mb-[64px] p-5">
          <NuxtPage />
        </main>      
          <Footer />
        </div>
    </div>
  </template>

  <script setup>
  import Sidebar from '~/components/Sidebar.vue'
  import Navbar from '~/components/Navbar.vue'
  import Footer from '~/components/Footer.vue'
  </script>
