<template>
    <div class="hub-container">
      <header class="app-header">
        <div class="brand">GOLD<span class="highlight">VALUATION</span></div>
        <div class="user-profile">
          <span>{{ user.name }}</span>
          <button @click="$emit('logout')" class="logout-link">Logout</button>
        </div>
      </header>
  
      <div class="tabs-wrapper">
        <button 
          v-for="karat in karatList" 
          :key="karat.id"
          :class="['tab-btn', { active: activeKarat.id === karat.id }]"
          @click="activeKarat = karat"
        >
          {{ karat.label }}
        </button>
      </div>
  
      <main class="calc-grid">
        <InputSection 
          ref="inputComponent"
          :karat="activeKarat"
          @update="handleUpdate"
        />
  
        <QuotationSection 
          :data="currentCalculation" 
          :karat="activeKarat" 
        />
      </main>
    </div>
  </template>
  
  <script>
  import InputSection from './InputSection.vue';
  import QuotationSection from './QuotationSection.vue';
  
  export default {
    components: { InputSection, QuotationSection },
    props: ['user'],
    data() {
      return {
        // UPDATED LIST WITH 10K
        karatList: [
          { id: '24k', label: '24K Fine', price: 9935.24 },
          { id: '22k', label: '22K Standard', price: 9103.79 },
          { id: '18k', label: '18K Jewelry', price: 7448.56 },
          { id: '14k', label: '14K Local', price: 5790.81 },
          { id: '10k', label: '10K Scrap', price: 4142.90 } // Added 10K
        ],
        activeKarat: null,
        currentCalculation: {
          weight: 0,
          designFee: 0,
          goldCost: 0,
          subtotal: 0,
          tax: 0,
          total: 0
        }
      };
    },
    created() {
      this.activeKarat = this.karatList[0]; 
    },
    methods: {
      handleUpdate(payload) {
        const goldCost = payload.weight * this.activeKarat.price;
        const subtotal = goldCost + payload.designFee;
        const tax = subtotal * 0.12;
        
        this.currentCalculation = {
          weight: payload.weight,
          designFee: payload.designFee,
          goldCost,
          subtotal,
          tax,
          total: subtotal + tax
        };
      }
    }
  };
  </script>
  
  <style scoped>
  .hub-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  
  .brand { font-size: 1.5rem; letter-spacing: 2px; }
  .highlight { color: var(--gold-primary); font-weight: bold; }
  
  /* Tabs Styling */
  .tabs-wrapper {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    overflow-x: auto;
    padding-bottom: 5px;
  }
  
  .tab-btn {
    background: var(--bg-card);
    border: 1px solid rgba(255,255,255,0.1);
    color: var(--text-muted);
    padding: 12px 24px;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 600;
    min-width: 100px; /* Slightly reduced to fit more tabs */
    white-space: nowrap;
  }
  
  .tab-btn.active {
    background: linear-gradient(135deg, var(--gold-dark), var(--gold-primary));
    color: #000;
    border-color: var(--gold-primary);
    box-shadow: 0 0 15px var(--gold-glow);
  }
  
  .calc-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  
  .user-profile {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .user-profile span { color: #888; font-size: 0.9rem; }
  
  .logout-link {
    background: transparent;
    border: 1px solid #333;
    color: #666;
    padding: 5px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: 0.2s;
  }
  .logout-link:hover { border-color: #cc4444; color: #cc4444; }
  
  @media (max-width: 768px) {
    .calc-grid { grid-template-columns: 1fr; }
  }
  </style>