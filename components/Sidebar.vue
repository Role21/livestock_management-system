        <template>
            <aside class="w-[250px] bg-[#2c3e50] text-white fixed top-[50px] bottom-[50px] left-0 overflow-y-auto pt-5 px-5">
            <nav class="flex flex-col gap-2">
                <!-- Main Menu Items -->
                <NuxtLink to="/" class="menu-item"><Home class="icon" /> Dashboard</NuxtLink>
                <NuxtLink to="/animals" class="menu-item"><Store class="icon" /> Livestock</NuxtLink>
                <NuxtLink to="/purchase" class="menu-item"><ShoppingCart class="icon" /> Purchase</NuxtLink>
                <div>
                <div class="menu-item cursor-pointer" @click="toggleHealthMenu">
                    <Syringe class="icon" /> Vaccine
                    <ChevronDown class="ml-auto transition-transform duration-200" :class="{ 'rotate-180': healthMenuOpen }" />
                </div>
                <div v-if="healthMenuOpen" class="ml-6 flex flex-col gap-1">
                    <NuxtLink to="/vaccinations/VaccinationList" class="submenu-item">Vaccination List</NuxtLink>
                    <NuxtLink to="/vaccinations/VaccinationSchedule" class="submenu-item">Vaccination Schedule</NuxtLink>
                    <NuxtLink to="/vaccinations/VaccinePurchase" class="submenu-item">Vaccine Purchase</NuxtLink>
                    <NuxtLink to="/vaccinations/VaccinationRouting" class="submenu-item">Route</NuxtLink>
                </div>
                </div>
                <div>
                    <div class="menu-item cursor-pointer flex items-center gap-2" @click="toggleFoodHistoryMenu">
                    <Utensils class="w-5 h-5" /><span>Foodhistory</span>
                    <component :is="foodHistoryMenuOpen ? ChevronUp : ChevronDown" class="ml-auto w-4 h-4"/>
                    </div>
                    <div v-if="foodHistoryMenuOpen" class="ml-7 mt-1 flex flex-col gap-2 text-sm">
                    <NuxtLink to="/foodhistory/foodlist" class="submenu-item flex items-center gap-2">
                        <List class="w-4 h-4" />
                        foodlist
                    </NuxtLink>
                    <NuxtLink to="/foodhistory/foodstocklist" class="submenu-item flex items-center gap-2">
                        <Box class="w-4 h-4" />
                        foodstocklist
                    </NuxtLink>
                    <NuxtLink to="/foodhistory/foodpurchaselist" class="submenu-item flex items-center gap-2">
                        <ShoppingCart class="w-4 h-4" />
                        foodpurchaselist
                    </NuxtLink>
                    </div>
                </div>
                <NuxtLink to="/breeding" class="menu-item flex items-center gap-2"><Factory class="w-5 h-5" />
                    <span>Production</span>
                </NuxtLink>
                <div>
                    <div class="menu-item cursor-pointer flex items-center gap-2" @click="toggleSalesMenu">
                    <TrendingUp class="w-5 h-5" /><span>Sales</span><ChevronDown v-if="!salesMenuOpen" class="w-4 h-4 ml-auto" />
                    <ChevronUp v-else class="w-4 h-4 ml-auto" /></div>
                    <div v-if="salesMenuOpen" class="ml-4 flex flex-col gap-1">
                    <NuxtLink to="/sales/livestocksaleslist" class="submenu-item flex items-center gap-2">
                        <List class="w-4 h-4" />
                        <span>Sales List</span>
                    </NuxtLink>
                    <NuxtLink to="/sales/productsaleslist" class="submenu-item flex items-center gap-2">
                        <BarChart2 class="w-4 h-4" />
                        <span>Sales Report</span>
                    </NuxtLink>
                    </div>
                </div>

                <!-- Payments Submenu -->
                <div>
                    <div class="menu-item cursor-pointer flex items-center gap-2" @click="togglePaymentsMenu">
                    <CreditCard class="w-5 h-5" /><span>Payments</span>
                    <ChevronDown v-if="!paymentsMenuOpen" class="w-4 h-4 ml-auto" />
                    <ChevronUp v-else class="w-4 h-4 ml-auto" />
                    </div>
                    <div v-if="paymentsMenuOpen" class="ml-4 flex flex-col gap-1">
                    <NuxtLink to="/payments/paymentlist" class="submenu-item flex items-center gap-2">
                        <List class="w-4 h-4" />
                        <span>Payment List</span>
                    </NuxtLink>
                    <NuxtLink to="/payments/paymentreport" class="submenu-item flex items-center gap-2">
                        <FileText class="w-4 h-4" />
                        <span>Payment Report</span>
                    </NuxtLink>
                    </div>
                </div>
        
                <!-- Expense Submenu -->
                <div>
                <div class="menu-item cursor-pointer" @click="toggleExpenseMenu">
                    <Wallet class="icon" /> Expenses
                    <ChevronDown class="ml-auto transition-transform duration-200" :class="{ 'rotate-180': expenseMenuOpen }" />
                </div>
                <div v-if="expenseMenuOpen" class="ml-6 flex flex-col gap-1">
                    <NuxtLink to="/expenses/listExpense" class="submenu-item">List Expense</NuxtLink>
                    <NuxtLink to="/expenses/listExpenseCategory" class="submenu-item">Expense Categories</NuxtLink>
                </div>
                </div>  
                <!-- More Links with Icons -->
            <NuxtLink to="/report" class="menu-item"><FileText class="icon" /> Report</NuxtLink>
            <NuxtLink to="/supplier" class="menu-item"><Truck class="icon" /> Supplier</NuxtLink>
            <NuxtLink to="/client" class="menu-item"><Users class="icon" /> Client</NuxtLink>
            <NuxtLink to="/staff" class="menu-item"><UserCheck class="icon" /> Staff</NuxtLink>
            <NuxtLink to="/settings" class="menu-item"><Settings class="icon" /> Settings</NuxtLink>
            <NuxtLink to="/profile" class="menu-item"><UserCircle class="icon" /> Profile</NuxtLink>
            </nav>
            </aside>
        </template>       


        <script setup>
        import { ref } from 'vue'
        import { 
          Home, Cow, ShoppingCart,Store, TrendingUp, Syringe, ChevronDown, ChevronUp, 
          Wallet, FileText, Settings, Truck, Users, UserCheck, 
          UserCircle, Utensils, List, Box, Factory, BarChart2, CreditCard 
        } from 'lucide-vue-next'
        
        const healthMenuOpen = ref(false)
        const toggleHealthMenu = () => {
          healthMenuOpen.value = !healthMenuOpen.value
        }
        
        const salesMenuOpen = ref(false)
        const toggleSalesMenu = () => {
          salesMenuOpen.value = !salesMenuOpen.value
        }
        
        const foodHistoryMenuOpen = ref(false)
        const toggleFoodHistoryMenu = () => {
          foodHistoryMenuOpen.value = !foodHistoryMenuOpen.value
        }
        
        const paymentsMenuOpen = ref(false)
        const togglePaymentsMenu = () => {
          paymentsMenuOpen.value = !paymentsMenuOpen.value
        }
        
        const expenseMenuOpen = ref(false)
        const toggleExpenseMenu = () => {
          expenseMenuOpen.value = !expenseMenuOpen.value
        }
        </script>      

        
        <style scoped>
        .menu-item {
            @apply flex items-center gap-2 px-4 py-2 rounded-lg bg-[#34495e] hover:bg-[#3d566e] transition-all duration-200 text-left;
        }
        
        .submenu-item {
            @apply px-3 py-2 rounded-md bg-[#3b4a5a] hover:bg-[#4c5c6d] transition-all duration-200 text-sm;
        }
        
        .icon {
            @apply w-5 h-5;
        }
        </style>
        