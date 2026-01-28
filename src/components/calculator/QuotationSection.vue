<template>
    <div class="summary-card">
      <div class="summary-header">
        <h3>Quotation Estimate</h3>
        <div class="active-badge">{{ karat.label }}</div>
      </div>
  
      <div class="bill-content">
        <div class="row">
          <div class="row-details">
            <span class="item-name">Gold Base Cost</span>
            <span class="item-sub">Rate: ₱{{ karat.price.toLocaleString() }}/g</span>
          </div>
          <span class="amount">₱{{ fmt(data.goldCost) }}</span>
        </div>
  
        <div class="row">
          <span class="item-name">Craftsmanship Fee</span>
          <span class="amount">₱{{ fmt(data.designFee) }}</span>
        </div>
  
        <div class="divider"></div>
  
        <div class="row subtotal-row">
          <span>Subtotal</span>
          <span>₱{{ fmt(data.subtotal) }}</span>
        </div>
  
        <div class="row tax-row">
          <span>VAT (12%)</span>
          <span>₱{{ fmt(data.tax) }}</span>
        </div>
      </div>
  
      <div class="total-box">
        <span class="total-label">Total Estimate</span>
        <span class="total-value">₱{{ fmt(data.total) }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['data', 'karat'],
    methods: {
      fmt(val) {
        return val ? val.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00';
      }
    }
  };
  </script>
  
  <style scoped>
  .summary-card {
    background: var(--bg-card);
    padding: 30px;
    border-radius: var(--radius-lg);
    border: var(--border-glass);
    box-shadow: var(--shadow-card);
    display: flex;
    flex-direction: column;
    height: 100%; /* Match height of left card */
  }
  
  .summary-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  
  h3 {
    margin: 0;
    color: var(--text-muted);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .active-badge {
    background: rgba(212, 175, 55, 0.1);
    color: var(--gold-primary);
    padding: 5px 12px;
    border-radius: 20px;
    border: 1px solid rgba(212, 175, 55, 0.3);
    font-size: 0.8rem;
    font-weight: bold;
  }
  
  /* Bill Rows */
  .bill-content {
    flex: 1; /* Pushes total to bottom */
  }
  
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
  }
  
  .item-name { color: #ddd; font-size: 0.95rem; display: block; }
  .item-sub { color: #555; font-size: 0.75rem; display: block; margin-top: 2px; }
  .amount { color: #fff; font-family: 'Courier New', monospace; letter-spacing: -0.5px; }
  
  .divider {
    height: 1px;
    background: repeating-linear-gradient(to right, #333 0, #333 5px, transparent 5px, transparent 10px);
    margin: 25px 0;
  }
  
  .subtotal-row { color: var(--gold-light); font-weight: 500; }
  .tax-row { color: #666; font-size: 0.9rem; }
  
  /* Total Box */
  .total-box {
    background: var(--gold-gradient);
    margin-top: auto;
    padding: 25px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 10px 20px rgba(184, 148, 44, 0.2);
    text-align: center;
  }
  
  .total-label {
    color: #3e2b00;
    font-size: 0.85rem;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 5px;
  }
  
  .total-value {
    color: #000;
    font-size: 2.2rem;
    font-weight: 800;
    line-height: 1;
  }
  </style>