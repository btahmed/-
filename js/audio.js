// Gestion du son
const Audio = {
  context: null,
  
  init() {
    try {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      return true;
    } catch (e) {
      console.warn('Audio context not supported:', e);
      return false;
    }
  },
  
  playTone(frequency = 440, duration = 200) {
    if (!this.context) return;
    
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, this.context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration / 1000);
    
    oscillator.start(this.context.currentTime);
    oscillator.stop(this.context.currentTime + duration / 1000);
  }
};
