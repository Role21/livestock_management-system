# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

  /animal/
   'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Animals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      species: {
        type: Sequelize.STRING
      },
      breed: {  // Adding breed column
        type: Sequelize.STRING
      },
      dob: {  // Adding date of birth column
        type: Sequelize.DATEONLY
      },
      gender: {  // Adding gender column
        type: Sequelize.STRING
      },
      weight: {  // Adding weight column
        type: Sequelize.DECIMAL(10, 2)
      },
      notes: {  // Adding notes column
        type: Sequelize.TEXT
      },
      age: {
        type: Sequelize.INTEGER
      },
      health_status: {
        allowNull:false,
        type: Sequelize.STRING
        
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Animals');
  }
};

/breeding/'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Breedings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      animal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Animals', // This is the name of the table the foreign key references
          key: 'id'         // The field in the 'Animals' table that we are linking to
        },
        onUpdate: 'CASCADE', // If an animal record is updated, the changes cascade
        onDelete: 'CASCADE'  // If an animal record is deleted, related breeding records are deleted
      },
      breeding_date: {
        type: Sequelize.DATE
      },
      expected_due_date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Breedings');
  }
};
/health/
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Health', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      animal_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Animals',  // The referenced table
          key: 'id',          // The referenced column
        },
        onDelete: 'CASCADE',  // Deletes health record when the associated animal is deleted
        onUpdate: 'CASCADE'   // Updates health record when the associated animal's ID changes
      },
      checkup_date: {
        type: Sequelize.DATE
      },
      diagnosis: {
        type: Sequelize.STRING
      },
      treatment: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Health');
  }
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Animal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Animal.init({
    name: DataTypes.STRING,
    species: DataTypes.STRING,
    breed: DataTypes.STRING,
    ob: DataTypes.DATEONLY,     
    gender: DataTypes.STRING,
    weight: DataTypes.DECIMAL(10, 2),
    notes: DataTypes.TEXT,
    age: DataTypes.INTEGER,
    health_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Animal',
    timestamps: true,
    createdAt: 'createdAt',  // Use default 'createdAt' field
    updatedAt: 'updatedAt', 
  });
  return Animal;
};




/migrations/
npx sequelize-cli model:generate --name Health --attributes animal_id:integer,checkup_date:date,diagnosis:string,treatment:string

npx sequelize-cli model:generate --name Breeding --attributes animal_id:integer,breeding_date:date,expected_due_date:date,status:string
  
npx sequelize-cli model:generate --name Animal --attributes name:string,species:string,age:integer,health_status:string

npx sequelize-cli db:migrate:undo:all  

rm -rf models/*.cjs migrations/*.cjs


  


<template>
    <aside class="w-[250px] bg-[#2c3e50] text-white fixed top-[50px] bottom-[50px] left-0 overflow-y-auto pt-5 px-5">
      <nav class="flex flex-col gap-2">
        <NuxtLink to="/" class="menu-item">Dashboard</NuxtLink>
        <NuxtLink to="/animals" class="menu-item">Livestock</NuxtLink>
        <NuxtLink to="/purchase" class="menu-item">Purchase</NuxtLink>
  
        <!-- Vaccine Submenu -->
        <div>
          <div class="menu-item cursor-pointer" @click="toggleHealthMenu">Vaccine</div>
          <div v-if="healthMenuOpen" class="ml-4 flex flex-col gap-1">
            <NuxtLink to="/vaccinations/VaccinationList" class="submenu-item">Vaccination List</NuxtLink>
            <NuxtLink to="/vaccinations/VaccinationSchedule" class="submenu-item">Vaccination Schedule</NuxtLink>
            <NuxtLink to="/vaccinations/VaccinePurchase" class="submenu-item">Vaccine Purchase</NuxtLink>
            <NuxtLink to="/vaccinations/VaccinationRouting" class="submenu-item">Route</NuxtLink>
          </div>
        </div>
  
        <!-- Foodhistory Submenu -->
        <div>
          <div class="menu-item cursor-pointer" @click="toggleFoodHistoryMenu">Foodhistory</div>
          <div v-if="foodHistoryMenuOpen" class="ml-4 flex flex-col gap-1">
            <NuxtLink to="/foodhistory/foodlist" class="submenu-item">foodlist</NuxtLink>
            <NuxtLink to="/foodhistory/foodstocklist" class="submenu-item">foodstocklist</NuxtLink>
            <NuxtLink to="/foodhistory/foodpurchaselist" class="submenu-item">foodpurchaselist</NuxtLink>
          </div>
        </div>
  
        <NuxtLink to="/breeding" class="menu-item">Production</NuxtLink>
  
        <!-- Sales Submenu -->
        <div>
          <div class="menu-item cursor-pointer" @click="toggleSalesMenu">Sales</div>
          <div v-if="salesMenuOpen" class="ml-4 flex flex-col gap-1">
            <NuxtLink to="/sales/livestocksaleslist" class="submenu-item">Sales List</NuxtLink>
            <NuxtLink to="/sales/productsaleslist" class="submenu-item">Sales Report</NuxtLink>
          </div>
        </div>
  
        <!-- Payments Submenu -->
        <div>
          <div class="menu-item cursor-pointer" @click="togglePaymentsMenu">Payments</div>
          <div v-if="paymentsMenuOpen" class="ml-4 flex flex-col gap-1">
            <NuxtLink to="/payments/paymentlist" class="submenu-item">Payment List</NuxtLink>
            <NuxtLink to="/payments/paymentreport" class="submenu-item">Payment Report</NuxtLink>
          </div>
        </div>
  
        <!-- Expenses Submenu -->
        <div>
          <div class="menu-item cursor-pointer" @click="toggleExpensesMenu">Expenses</div>
          <div v-if="expensesMenuOpen" class="ml-4 flex flex-col gap-1">
            <NuxtLink to="/expenses/listExpense" class="submenu-item">Expense List</NuxtLink>
            <NuxtLink to="/expenses/listExpenseCategory" class="submenu-item">Expense Categories</NuxtLink>
          </div>
        </div>
  
        <NuxtLink to="/report" class="menu-item">Report</NuxtLink>
        <NuxtLink to="/supplier" class="menu-item">Supplier</NuxtLink>
        <NuxtLink to="/client" class="menu-item">Client</NuxtLink>
        <NuxtLink to="/staff" class="menu-item">Staff</NuxtLink>
        <NuxtLink to="/settings" class="menu-item">Settings</NuxtLink>
        <NuxtLink to="/profile" class="menu-item">Profile</NuxtLink>
      </nav>
    </aside>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const healthMenuOpen = ref(false)
  const foodHistoryMenuOpen = ref(false)
  const salesMenuOpen = ref(false)
  const paymentsMenuOpen = ref(false)
  const expensesMenuOpen = ref(false)
  
  const togglePaymentsMenu = () => {
    paymentsMenuOpen.value = !paymentsMenuOpen.value
  }
  
  const toggleExpensesMenu = () => {
    expensesMenuOpen.value = !expensesMenuOpen.value
  }
  
  const toggleHealthMenu = () => {
    healthMenuOpen.value = !healthMenuOpen.value
  }
  
  const toggleFoodHistoryMenu = () => {
    foodHistoryMenuOpen.value = !foodHistoryMenuOpen.value
  }
  
  const toggleSalesMenu = () => {
    salesMenuOpen.value = !salesMenuOpen.value
  }
  </script>
  
  <style scoped>
  .menu-item {
    @apply px-4 py-2 rounded-lg bg-[#34495e] hover:bg-[#3d566e] transition-all duration-200 text-left;
  }
  
  .submenu-item {
    @apply px-3 py-2 rounded-md bg-[#3b4a5a] hover:bg-[#4c5c6d] transition-all duration-200 text-sm;
  }
  </style>
  

  node scripts/createAdmin.js
