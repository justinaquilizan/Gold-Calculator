<template>
    <div class="section-card">
      <h3>Configure Details</h3>
      
      <div class="input-group">
        <label>Weight (Grams)</label>
        
        <div class="digital-scale-wrapper">
          <button class="stepper-btn minus" @click="adjustWeight(-0.1)">−</button>
          
          <div class="scale-display">
            <input 
              type="number" 
              v-model.number="weight" 
              step="0.01"
              @input="emitChanges"
              placeholder="0.00"
            >
            <span class="unit">g</span>
          </div>
  
          <button class="stepper-btn plus" @click="adjustWeight(0.1)">+</button>
        </div>
  
        <div class="presets">
          <button 
            v-for="val in [5, 10, 50]" 
            :key="val" 
            class="preset-pill" 
            @click="setWeight(val)"
          >
            {{ val }}g
          </button>
        </div>
      </div>
  
      <div class="input-group">
        <label>Craftsmanship Tier</label>
        <div class="design-grid">
          <div 
            v-for="tier in designs" 
            :key="tier.val"
            :class="['design-card', { active: selectedDesign === tier.val }]"
            @click="selectDesign(tier.val)"
          >
            <span class="icon">{{ tier.icon }}</span>
            <span class="label">{{ tier.label }}</span>
            <span class="price-tag">+₱{{ tier.val.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['karat'],
    data() {
      return {
        weight: 0,
        selectedDesign: 0,
        designs: [
          { label: 'Basic Ring', val: 2000, icon: '💍' },
          { label: 'Necklace', val: 3000, icon: '📿' },
          { label: 'Custom', val: 10000, icon: '✨' }
        ]
      };
    },
    methods: {
      adjustWeight(amount) {
        // Fix float math issues
        const newVal = this.weight + amount;
        this.weight = Math.max(0, parseFloat(newVal.toFixed(2)));
        this.emitChanges();
      },
      setWeight(val) {
        this.weight = val;
        this.emitChanges();
      },
      selectDesign(val) {
        this.selectedDesign = val;
        this.emitChanges();
      },
      emitChanges() {
        this.$emit('update', { weight: this.weight, designFee: this.selectedDesign });
      }
    },
    watch: {
      karat() { this.emitChanges(); } 
    }
  };
  </script>
  
  <style scoped>
  .section-card {
    background: var(--bg-card);
    padding: 30px;
    border-radius: var(--radius-lg);
    border: var(--border-glass);
    box-shadow: var(--shadow-card);
  }
  
  h3 {
    color: var(--text-muted);
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 1.5px;
    margin-bottom: 25px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding-bottom: 10px;
  }
  
  label {
    display: block;
    color: var(--text-muted);
    font-size: 0.9rem;
    margin-bottom: 12px;
  }
  
  /* Digital Scale Display */
  .digital-scale-wrapper {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
  }
  
  .scale-display {
    flex: 1;
    background: #000;
    border: 1px solid #333;
    border-radius: 8px;
    padding: 5px 15px;
    display: flex;
    align-items: center;
    position: relative;
    box-shadow: inset 0 0 10px rgba(0,0,0,0.8);
  }
  
  .scale-display input {
    width: 100%;
    background: transparent;
    border: none;
    color: var(--gold-light);
    font-family: 'Courier New', monospace;
    font-size: 2rem;
    font-weight: bold;
    text-align: right;
    padding-right: 25px; /* Space for unit */
  }
  
  .scale-display input:focus {
    outline: none;
  }
  
  .unit {
    position: absolute;
    right: 15px;
    bottom: 12px;
    color: #555;
    font-weight: bold;
  }
  
  /* Stepper Buttons */
  .stepper-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid #333;
    background: var(--bg-deep);
    color: var(--gold-primary);
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .stepper-btn:hover {
    border-color: var(--gold-primary);
    background: #111;
    transform: scale(1.05);
  }
  
  /* Presets */
  .presets {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
  }
  
  .preset-pill {
    background: transparent;
    border: 1px solid #444;
    color: #888;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: 0.3s;
  }
  
  .preset-pill:hover {
    border-color: var(--gold-primary);
    color: var(--gold-primary);
  }
  
  /* Design Grid */
  .design-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  
  .design-card {
    background: var(--bg-deep);
    border: 1px solid #333;
    border-radius: 12px;
    padding: 20px 10px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  
  .design-card:hover {
    transform: translateY(-2px);
    border-color: #555;
  }
  
  .design-card.active {
    background: linear-gradient(180deg, rgba(212, 175, 55, 0.1) 0%, rgba(0,0,0,0) 100%);
    border-color: var(--gold-primary);
    box-shadow: 0 0 15px var(--gold-glow);
  }
  
  .design-card .icon {
    font-size: 1.8rem;
    display: block;
    margin-bottom: 8px;
  }
  
  .design-card .label {
    display: block;
    font-size: 0.85rem;
    color: #ccc;
    margin-bottom: 5px;
  }
  
  .design-card .price-tag {
    display: block;
    font-size: 0.75rem;
    color: var(--gold-primary);
    font-weight: bold;
  }

  .reset-action {
  width: 100%;
  background: transparent;
  border: 1px dashed #444;
  color: #666;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.reset-action:hover {
  border-color: #cc4444;
  color: #cc4444;
  background: rgba(204, 68, 68, 0.05);
}

.reset-action .icon {
  font-size: 1.2rem;
  line-height: 0;
}
  </style>