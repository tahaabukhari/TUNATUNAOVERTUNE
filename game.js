class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    preload() {
        // Load any assets here if necessary (e.g., background image)
    }

    create() {

        const title = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 100, 
            'PEAK GAME 3', 
            { fontSize: '32px', fill: '#FFF' }
        )
        .setOrigin(0.5)
        .setShadow(2, 2, '#000', 2, true, true);

        const playButton = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 20, 
            'Play', 
            { fontSize: '32px', fill: '#FFF' }
        )
        .setOrigin(0.5)
        .setInteractive();

        playButton.on('pointerdown', () => {
            this.showlevelselector(title, playButton, optionsButton);
        });

        const optionsButton = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 40, 
            'Options', 
            { fontSize: '32px', fill: '#FFF' }
        )
        .setOrigin(0.5)
        .setInteractive();
    }

    showlevelselector(title, playButton, optionsButton) {
    // Destroy previous elements if they exist
    if (title) title.destroy();
    if (playButton) playButton.destroy();
    if (optionsButton) optionsButton.destroy();

    // Add the LEVEL SELECTOR title
    title = this.add.text(400, 150, 'LEVEL SELECTOR', { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);

    const previewImage = this.add.image(400, 225, 'previewImageKey').setOrigin(0.5);

    // Add the subtitle under the preview image
    const subtitle = this.add.text(400, 300, 'DEMO Stage', { fontSize: '24px', fill: '#AAA' }).setOrigin(0.5);

    // Add the PLAY button under the subtitle
    playButton = this.add.text(400, 350, 'PLAY', { fontSize: '28px', fill: '#FFF' })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            // Start the level or game logic here
            this.startGame();
        });
        const backButton = this.add.text(200, 100, 'BACK', { fontSize: '28px', fill: '#FFF' })
                    .setOrigin(0.5)
                    .setInteractive()
                    .on('pointerdown', () => {
                        // Destroy level selector elements
                        selectorTitle.destroy();
                        previewImage.destroy();
                        subtitle.destroy();
                        levelPlayButton.destroy();
                        backButton.destroy();

                        // Return to title screen
                        this.create(); // Re-create the title screen elements
                    });
            }

            startGame() {
                // Logic to start the game
                this.scene.start('LevelScene'); // Replace 'LevelScene' with the actual scene key for the level
            }
        }

class LevelScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelScene' });
        this.laneColors = [0xff0000, 0xffff00, 0x00ff00, 0x0000ff];
    }

    preload() {
        this.load.audio('demomusic', 'DEMO ST.mp3');
        this.load.image('characterImage1', 'image1.png');
        this.load.image('characterImage2', 'image2.png');
        this.load.image('characterImage3', 'image3.png');
        this.load.image('characterImage4', 'image4.png');
    }

    create() {
        const platformWidth = this.cameras.main.width / 1.5;
        const platformHeight = 20;
        const platformY = this.cameras.main.height - 100;
        const partWidth = platformWidth / 4;

        this.platforms = [];

        for (let i = 0; i < 4; i++) {
            const platform = this.matter.add.rectangle(partWidth * i + partWidth / 2, platformY, partWidth, platformHeight, { isStatic: true });
            this.platforms.push(platform);
        }

        this.player = this.matter.add.rectangle(partWidth / 2, platformY - 25, partWidth, 10, { isStatic: true });

        this.input.keyboard.on('keydown-A', () => this.movePlayerTo(0));
        this.input.keyboard.on('keydown-S', () => this.movePlayerTo(1));
        this.input.keyboard.on('keydown-D', () => this.movePlayerTo(2));
        this.input.keyboard.on('keydown-F', () => this.movePlayerTo(3));

        this.score = 0;
        this.streak = 0;

        this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '24px', fill: '#FFF' });
        this.streakText = this.add.text(10, 40, 'Streak: 0', { fontSize: '24px', fill: '#FFF' });

        this.character = this.add.image(this.cameras.main.width - 100, this.cameras.main.height - 200, 'characterImage1').setScale(0.3);

        this.pauseButton = this.add.text(this.cameras.main.width - 80, 20, 'Pause', { fontSize: '24px', fill: '#FFF' })
            .setInteractive()
            .on('pointerdown', () => this.pauseGame());

        this.game.events.on('blur', () => this.pauseGame());

        this.input.keyboard.on('keydown-A', () => this.character.setTexture('characterImage1'));
        this.input.keyboard.on('keydown-S', () => this.character.setTexture('characterImage3'));
        this.input.keyboard.on('keydown-D', () => this.character.setTexture('characterImage2'));
        this.input.keyboard.on('keydown-F', () => this.character.setTexture('characterImage4'));

        const beatInterval = 705.6;
        this.beatmap = [
          { time: 0 * beatInterval, lane: 0 },
          { time: 1 * beatInterval, lane: 1 },
          { time: 2 * beatInterval, lane: 0 },
          { time: 3 * beatInterval, lane: 0 },
          { time: 4 * beatInterval, lane: 1 },
          { time: 5 * beatInterval, lane: 1 },
          { time: 6 * beatInterval, lane: 0 },
          { time: 7 * beatInterval, lane: 0 },
          { time: 8 * beatInterval, lane: 1 },
          { time: 9 * beatInterval, lane: 0 },
          { time: 10 * beatInterval, lane: 1 },
          { time: 11 * beatInterval, lane: 2 },
          { time: 12 * beatInterval, lane: 2 },
          { time: 13 * beatInterval, lane: 2 },
          { time: 14 * beatInterval, lane: 3 },
          { time: 17 * beatInterval, lane: 0 },
          { time: 17.5 * beatInterval, lane: 1 },
          { time: 18 * beatInterval, lane: 0 },
          { time: 18.5 * beatInterval, lane: 1 },
          { time: 19 * beatInterval, lane: 0 },
          { time: 19.5 * beatInterval, lane: 1 },
          { time: 20 * beatInterval, lane: 0 },
          { time: 20.5 * beatInterval, lane: 2 },
          { time: 21 * beatInterval, lane: 3 },
          { time: 21.5 * beatInterval, lane: 2 },
          { time: 22 * beatInterval, lane: 3 },
          { time: 22.5 * beatInterval, lane: 2 },
          { time: 23 * beatInterval, lane: 3 },
          { time: 23.5 * beatInterval, lane: 2 },
          { time: 24 * beatInterval, lane: 3 },
          { time: 24.5 * beatInterval, lane: 0 },
          { time: 25 * beatInterval, lane: 1 },
          { time: 25.5 * beatInterval, lane: 1 },
          { time: 26 * beatInterval, lane: 0 },
          { time: 26.5 * beatInterval, lane: 1 },
          { time: 27 * beatInterval, lane: 1 },
          { time: 28 * beatInterval, lane: 1 },
          { time: 29 * beatInterval, lane: 3 },
          { time: 29.5 * beatInterval, lane: 0 },
          { time: 30 * beatInterval, lane: 3 },
          { time: 31 * beatInterval, lane: 3 },
          { time: 32 * beatInterval, lane: 3 },
          { time: 32.5 * beatInterval, lane: 0 },
          { time: 33 * beatInterval, lane: 0 },
          { time: 33.5 * beatInterval, lane: 1 },
          { time: 34 * beatInterval, lane: 0 },
          { time: 34.5 * beatInterval, lane: 1 },
          { time: 35 * beatInterval, lane: 0 },
          { time: 35.5 * beatInterval, lane: 1 },
          { time: 36 * beatInterval, lane: 2 },
          { time: 36.5 * beatInterval, lane: 3 },
          { time: 37 * beatInterval, lane: 2 },
          { time: 37.5 * beatInterval, lane: 3 },
          { time: 38 * beatInterval, lane: 2 },
          { time: 38.5 * beatInterval, lane: 3 },
          { time: 39 * beatInterval, lane: 2 },
          { time: 39.5 * beatInterval, lane: 3 },
          { time: 40 * beatInterval, lane: 2 },
          { time: 40.5 * beatInterval, lane: 0 },
          { time: 41 * beatInterval, lane: 1 },
          { time: 41.5 * beatInterval, lane: 1 },
          { time: 42 * beatInterval, lane: 0 },
          { time: 43 * beatInterval, lane: 1 },
          { time: 44 * beatInterval, lane: 3 },
          { time: 44.5 * beatInterval, lane: 0 },
          { time: 45 * beatInterval, lane: 3 },
          { time: 46 * beatInterval, lane: 3 },
          { time: 47 * beatInterval, lane: 3 },
          { time: 47.5 * beatInterval, lane: 0 },
          { time: 48 * beatInterval, lane: 3 },
          { time: 49 * beatInterval, lane: 1 },
          { time: 50 * beatInterval, lane: 1 },
          { time: 50.5 * beatInterval, lane: 3 },
          { time: 51 * beatInterval, lane: 1 },
          { time: 51.5 * beatInterval, lane: 3 },
          { time: 52 * beatInterval, lane: 0 },
          { time: 53 * beatInterval, lane: 0 },
          { time: 54 * beatInterval, lane: 2 },
          { time: 55 * beatInterval, lane: 0 },
          { time: 55.5 * beatInterval, lane: 2 },
          { time: 56.5 * beatInterval, lane: 1 },
          { time: 57.5 * beatInterval, lane: 1 },
          { time: 58.5 * beatInterval, lane: 3 },
          { time: 59.5 * beatInterval, lane: 1 },
          { time: 60 * beatInterval, lane: 3 },
          { time: 61 * beatInterval, lane: 2 },
          { time: 62 * beatInterval, lane: 2 },
          { time: 63 * beatInterval, lane: 0 },
          { time: 64 * beatInterval, lane: 2 },
          { time: 64.5 * beatInterval, lane: 0 },
          { time: 69 * beatInterval, lane: 2 },
          { time: 70 * beatInterval, lane: 3 },
          { time: 71 * beatInterval, lane: 2 },
          { time: 72 * beatInterval, lane: 4 },
          { time: 73 * beatInterval, lane: 1 },
          { time: 74 * beatInterval, lane: 0 },
          { time: 75 * beatInterval, lane: 3 },
          { time: 76 * beatInterval, lane: 2 },
          { time: 77 * beatInterval, lane: 4 },
          { time: 78 * beatInterval, lane: 1 },
          { time: 79 * beatInterval, lane: 0 },
          { time: 80 * beatInterval, lane: 3 },
          { time: 81 * beatInterval, lane: 2 },
          { time: 82 * beatInterval, lane: 4 },
          { time: 83 * beatInterval, lane: 1 },
          { time: 84 * beatInterval, lane: 0 },
          { time: 85 * beatInterval, lane: 3 },
          { time: 86 * beatInterval, lane: 2 },
          { time: 87 * beatInterval, lane: 4 },
          { time: 88 * beatInterval, lane: 1 },
          { time: 89 * beatInterval, lane: 2 },
          { time: 90 * beatInterval, lane: 3 },
          { time: 91 * beatInterval, lane: 2 },
          { time: 92 * beatInterval, lane: 4 },
          { time: 93 * beatInterval, lane: 1 },
          { time: 94 * beatInterval, lane: 0 },
          { time: 95 * beatInterval, lane: 3 },
          { time: 96 * beatInterval, lane: 2 },
          { time: 97 * beatInterval, lane: 4 },
          { time: 98 * beatInterval, lane: 1 },
          { time: 99 * beatInterval, lane: 0 },
          { time: 99 * beatInterval, lane: 1 },
          { time: 100 * beatInterval, lane: 3 },
          { time: 101 * beatInterval, lane: 2 },
          { time: 102 * beatInterval, lane: 4 },
          { time: 103 * beatInterval, lane: 0 },
          { time: 104 * beatInterval, lane: 2 },
          { time: 105 * beatInterval, lane: 1 },
          { time: 106 * beatInterval, lane: 2 },
          { time: 107 * beatInterval, lane: 3 },
          { time: 108 * beatInterval, lane: 0 },
          { time: 109 * beatInterval, lane: 2 },
          { time: 110 * beatInterval, lane: 1 },
          { time: 111 * beatInterval, lane: 4 },
          { time: 112 * beatInterval, lane: 3 },
          { time: 113 * beatInterval, lane: 0 },
          { time: 114 * beatInterval, lane: 2 },
          { time: 115 * beatInterval, lane: 1 },
          { time: 116 * beatInterval, lane: 4 },
          { time: 117 * beatInterval, lane: 3 },
          { time: 118 * beatInterval, lane: 0 },
          { time: 119 * beatInterval, lane: 2 },
          { time: 120 * beatInterval, lane: 1 },
          { time: 121 * beatInterval, lane: 4 },
          { time: 122 * beatInterval, lane: 3 },
          { time: 123 * beatInterval, lane: 1 },
          { time: 124 * beatInterval, lane: 2 },
          { time: 125 * beatInterval, lane: 1 },
          { time: 126 * beatInterval, lane: 4 },
          { time: 127 * beatInterval, lane: 3 },
          { time: 128 * beatInterval, lane: 0 },
          { time: 129 * beatInterval, lane: 2 },
          { time: 130 * beatInterval, lane: 1 },
          { time: 131 * beatInterval, lane: 4 },
          { time: 132 * beatInterval, lane: 3 },
          { time: 133 * beatInterval, lane: 0 },
          { time: 134 * beatInterval, lane: 2 },
          { time: 135 * beatInterval, lane: 1 },
          { time: 136 * beatInterval, lane: 4 },
          { time: 137 * beatInterval, lane: 3 },
          { time: 138 * beatInterval, lane: 0 },
          { time: 139 * beatInterval, lane: 2 },
          { time: 140 * beatInterval, lane: 1 },
          { time: 141 * beatInterval, lane: 4 },
          { time: 142 * beatInterval, lane: 3 },
          { time: 143 * beatInterval, lane: 0 },
          { time: 144 * beatInterval, lane: 2 },
          { time: 145 * beatInterval, lane: 1 },
          { time: 146 * beatInterval, lane: 4 },
          { time: 147 * beatInterval, lane: 3 },
          { time: 148 * beatInterval, lane: 0 },
          { time: 149 * beatInterval, lane: 2 },
          { time: 150 * beatInterval, lane: 1 },
          { time: 151 * beatInterval, lane: 4 },
          { time: 152 * beatInterval, lane: 3 },
          { time: 153 * beatInterval, lane: 0 },
          { time: 154 * beatInterval, lane: 3 },
          { time: 155 * beatInterval, lane: 1 },
          { time: 156 * beatInterval, lane: 4 },
          { time: 157 * beatInterval, lane: 3 },
          { time: 158 * beatInterval, lane: 0 },
          { time: 159 * beatInterval, lane: 2 },
          { time: 160 * beatInterval, lane: 1 },
          { time: 161 * beatInterval, lane: 4 },
          { time: 162 * beatInterval, lane: 3 },
          { time: 163 * beatInterval, lane: 0 },
          { time: 164 * beatInterval, lane: 2 },
          { time: 165 * beatInterval, lane: 1 },
          { time: 166 * beatInterval, lane: 4 },
          { time: 167 * beatInterval, lane: 3 },
          { time: 168 * beatInterval, lane: 0 },
          { time: 169 * beatInterval, lane: 2 },
          { time: 170 * beatInterval, lane: 1 },
          { time: 171 * beatInterval, lane: 4 },
          { time: 172 * beatInterval, lane: 3 },
          { time: 173 * beatInterval, lane: 0 },
          { time: 174 * beatInterval, lane: 2 },
          { time: 175 * beatInterval, lane: 2 }
        ];
        
        let musicStarted = false;

        this.beatmap.forEach((note, index) => {
            this.time.addEvent({
                delay: note.time,
                callback: () => {
                    this.spawnNote(note);
                }
            });
        });
    }

    spawnNote(noteData) {
        const platformWidth = this.cameras.main.width / 1.5;
        const partWidth = platformWidth / 4;
        const noteX = partWidth * noteData.lane + partWidth / 2;
        const noteColor = this.laneColors[noteData.lane];

        const note = this.add.rectangle(noteX, 0, partWidth - 10, 20, noteColor).setOrigin(0.5, 0.5);

        this.tweens.add({
            targets: note,
            y: this.cameras.main.height - 100,
            duration: 2000,
            paused: this.isPaused,
            onComplete: () => {
                this.checkNoteHit(noteData.lane, note);
                if (!this.musicStarted && noteData === this.beatmap[0]) {
                    this.music = this.sound.add('demomusic');
                    this.music.play();
                    this.musicStarted = true;
                }
            }
        });
    }

    checkNoteHit(lane, note) {
        const platformWidth = this.cameras.main.width / 1.5;
        const partWidth = platformWidth / 4;
        const playerX = this.player.position.x;
        const playerLane = Math.floor(playerX / partWidth);

        if (playerLane === lane && note.y >= this.cameras.main.height - 100) {
            this.score++;
            this.streak++;
            this.updateScoreAndStreak();
        } else {
            this.streak = 0;
            this.updateScoreAndStreak();
        }

        note.destroy();
    }

    updateScoreAndStreak() {
        this.scoreText.setText('Score: ' + this.score);
        this.streakText.setText('Streak: ' + this.streak);
    }

    pauseGame() {
        if (this.isPaused) return;

        this.isPaused = true;
        this.scene.pause();
        this.music?.pause();

        this.pauseMenu = this.add.container(this.cameras.main.width / 2, this.cameras.main.height / 2);

        const menuBackground = this.add.rectangle(0, 0, 200, 150, 0x000000, 0.7).setOrigin(0.5);
        const resumeButton = this.add.text(0, -40, 'Resume', { fontSize: '24px', fill: '#FFF' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => this.resumeGame());

        const backButton = this.add.text(0, 40, 'Back', { fontSize: '24px', fill: '#FFF' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.music?.stop();
                this.scene.stop();
                this.scene.start('MenuScene');
            });

        this.pauseMenu.add([menuBackground, resumeButton, backButton]);
    }

    resumeGame() {
        this.isPaused = false;
        this.scene.resume();
        this.music?.resume();
        this.pauseMenu.destroy();
    }

    update() {
        if (this.isPaused) return;
    }
}

const config = {
    type: Phaser.AUTO,
    width: 650,
    height: 450,
    scene: [TitleScene, LevelScene],
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 0.5 },
            debug: true
        }
    }
};
        
const game = new Phaser.Game(config);