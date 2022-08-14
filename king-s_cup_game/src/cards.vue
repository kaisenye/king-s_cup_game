<template>
  <div class="container">
    <div class="deck card" 
         @click="takeCard">
      <div class="card__back"></div>
    </div>
    <transition-group name="hand-card" 
                      tag="div"
                      :css="false"
                      @enter="enter"
                      @leave="leave"
                      class="hand">
      <div v-for="(card, index) in cards" 
           :key="card.id" 
           class="hand__card card"
           :class="['card--' + card.suit]"
           @click="dropCard(card.id)">
        <div class="card__face">
          <div class="card__value" 
               v-for="i in 2"
               :data-value="card.value"
               :data-suit="card.suit"></div>
          <div class="card__suit">{{ card.suit }}</div>
        </div>
        <div class="card__back"></div>
      </div>
    </transition-group>
  </div>
</template>

<script>
  const SETTLE_DURATION = 100;
  const DROP_DURATION = 200;
  const CARDS_AMOUNT = 1;
  // spades, hearts, diamons, clubs
  const SUITS = ['♠', '♥', '♦', '♣'];
  const VALUES = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const CARDS = VALUES.flatMap((value, i) => SUITS.map((suit, j) => ({
    id: `${i}-${j}`,
    value,
    suit
  })));
  
  export default {
    data() {
      return {
        lastCardId: 0,
        cards: [],
        isDeckEnabled: true,
      };
    },
    methods: {
      enter(el, done) {
        el.classList.add('hand__card--enter');
        el.classList.add('hand__card--flipped');
        el.style.pointerEvents = 'none';
        setTimeout(() => {
          el.addEventListener('transitionend', () => {
            el.style.pointerEvents = 'all';
            done();
          }, false);
          el.classList.remove('hand__card--enter');
        }, 0);
      },
      leave(el, done) {
        this.isDeckEnabled = false;
        el.classList.add('hand__card--leave');
        el.classList.remove('hand__card--flipped');
        const onLeave = () => {
          el.removeEventListener('transitionend', onLeave);
          this.isDeckEnabled = true;
          setTimeout(done, SETTLE_DURATION);
        };
        el.addEventListener('transitionend', onLeave, false);
      },
      takeCard() {
        if (!this.isDeckEnabled) { return; }
        if (this.cards.length === CARDS_AMOUNT) {
          this.cards.shift();
        }
        
        const randomIndex = Math.floor(Math.random() * CARDS.length);
        
        this.cards.push(...CARDS.splice(randomIndex, 1));
      },
      dropCard(id) {
        const dropId = this.cards.findIndex(card => card.id === id);
        
        if (dropId !== -1) {
          CARDS.push(...this.cards.splice(dropId, 1));
        }
      }
    },
    mounted() {
      let amount = 0;
      const intervalId = setInterval(() => {
        if (amount++ === CARDS_AMOUNT) {
          clearInterval(intervalId);
          return;
        }
        
        this.takeCard();
      }, DROP_DURATION)
    },
  };
</script>

<style lang="scss">
  $cards-amount: 4;
  
  html {
    --card-width: 20vmin;
    --card-height: calc(var(--card-width) * 1.6);
    
    --color-table: #4d5265;
    --color-card-face: #ecebf3;
    --color-card-back: #920114;
    
    --color-suits-black: #0c120c;
    --color-suits-red: #c20114;
    
    --color-deck-shadow: #401111;
    
    font-family: Georgia, serif;
  }
  
  body,
  html {
    width: 100%;
    height: 100%;
  }

  body {
    margin: 0;
    background: var(--color-table);
    overflow: hidden;
  }
  
  body,
  .container {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
  
  .container {
    flex: 1;
    padding-bottom: 10vmax;
    justify-content: center;
  }
  
  .card {
    font-size: calc(var(--card-width) / 5);
    position: relative;
    cursor: pointer;
    display: block;
    width: var(--card-width);
    height: var(--card-height);
    transform-style: preserve-3d;
    backface-visibility: visible;
    perspective: 100px;
    
    $offset: 10px;
    
    &--♠, 
    &--♣ {
      color: var(--color-suits-black);
    }

    &--♥,
    &--♦ {
      color: var(--color-suits-red);
    }
    
    &__face,
    &__back {
      position: absolute;
      top: $offset;
      left: $offset;
      right: $offset;
      bottom: $offset;
      border-radius: 0.4em;
      box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.5);
      backface-visibility: hidden;
      transition: box-shadow 600ms ease-out;
    }
    
    &__back {
      transform: rotate3d(0, 1, 0, 0deg);
      background-color: var(--color-card-back);
      background-image: 
        repeating-linear-gradient(
          45deg,
          rgba(0,0,0,0.3),
          rgba(0,0,0,0.3) 10%,
          transparent 0%,
          transparent 20%
        ),
        repeating-linear-gradient(
          -45deg,
          rgba(0,0,0,0.3),
          rgba(0,0,0,0.3) 10%,
          transparent 0%,
          transparent 20%
        );
      background-position: center center;
    }
    
    &__face {
      padding: 0.5em;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      transform: rotate3d(0, 1, 0, 180deg);
      background: var(--color-card-face);
    }
    
    &__suit {
      font-size: 2.5em;
    }
    
    &__value {
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 0.2em;
      display: flex;
      flex-flow: column;
      align-items: center;
      transform: scale(-1);
      line-height: 1;
      
      &:first-of-type {
        bottom: auto;
        right: auto;
        top: 0;
        left: 0;
        transform: none;
      }
      
      &::before {
        content: attr(data-value);
      }
      &::after {
        font-size: 0.7em;
        content: attr(data-suit);
      }
    }
  }
  
  .deck {
    &.card {
      transform: rotate3d(0, 1, 0, 0deg);
      
      .card__back {
        box-shadow: 
          0 6px 0 0 var(--color-deck-shadow),
          2px 6px 16px 0 rgba(0, 0, 0, 0.6)
      }
    }
  }
  
  .hand {
    position: relative;
    width: calc(var(--card-width) * #{ $cards-amount + 1.5 });
    height: var(--card-height);
    perspective: 1000px;
    perspective-origin: 50% 100%;
    
    &__card {
      --base-offset-y: 20%;
      --rotation-x-ratio: 0;
      --translate-z: 100px;
      --translate-y: 0%;
      --rotation-z: 0deg;
      
      position: absolute;
      top: 0;
      transform: 
        translate3d(
          -50%, 
          calc(var(--base-offset-y) + var(--translate-y)), 
          var(--translate-z)
        )
        rotate3d(
          var(--rotation-x-ratio), 
          1, 
          0.1, 
          var(--rotation-z)
        );
      transition: all 620ms ease-out;  
      will-change: left, top, transform;
      
      &:hover {
        --translate-z: 150px;
      }
      
      &--flipped {
        --rotation-z: 180deg;
      }
      
      &--enter.hand__card:nth-child(n):nth-last-child(n),
      &--leave.hand__card:nth-child(n):nth-last-child(n) {
        --base-offset-y: 0%;
        --rotation-z: 0deg;
        --rotation-x-ratio: 0;
        --translate-y: 0%;
        --translate-z: 0px;
        
        left: 50%;
        top: -100%;
        pointer-events: none;
        
        .card__face,
        .card__back {
          box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        }
      }
      &--enter {
        transition: none;
        z-index: 1;
      }
      &--leave {
        z-index: 1;
      }
      
      $offset-y: 10%;
      $base-x-ratio: 0.1;
      
      @for $i from 1 through ($cards-amount + 1) {
        $amount: if($i > $cards-amount, $cards-amount, $i);
        $shift: if($i > $cards-amount, 1, 0);
        $step: 100% / ($amount + 1);
        
        @for $j from 1 through $amount {
          &:nth-child(#{ $j + $shift }):nth-last-child(#{ $i - $j + 1 - $shift }) {
            @if ($i > 1 and ($j == 1 or $j == $amount)) {
              --translate-y: #{ $offset-y };      
              --rotation-x-ratio: #{ $base-x-ratio * if($j == 1, 1, -1) };
            }
            @if ($i > 3 and ($j == 2 or $j == 3)) {
              --rotation-x-ratio: #{ $base-x-ratio * if($j == 2, 1, -1) / 2 };
            }
            
            left: $step * $j;
          }
        }
      }
    } 
  }
</style>
