let instance = null;

export default class SoundManager {
  
    constructor() {
      this.SOUND_EVENT_TO_AUDIO_LOOKUP = {
        'ui_click': 'thud',
        'ui_click_disabled': 'thud_bounce',
        'farm_action': 'farm_action',
        'mine_action': 'mine_action',
        
        'game_start': 'music_1',
        'game_random_music_1': 'music_1',
        'music_upbeat_1': 'music_upbeat_1',
        
        'colonize_progress': 'colonize_progress',
        'colonize_done': 'upbeat_drums',
      };
    }
  
  static getInstance() {
    return instance || (instance = new SoundManager());
  }
  
  initialize(game) {
      this.game = game;
      return SoundManager.getInstance();
  }

  play(soundEvent) {
    if (!this.game) {
      console.warn('Using uninitialized SoundManager: SoundManager play ', soundEvent);
      return null;
    }
    const audioName = this.SOUND_EVENT_TO_AUDIO_LOOKUP[soundEvent];
    const audio = this.game.add.audio(audioName);
    audio.play();
    return audio;
  }
}
