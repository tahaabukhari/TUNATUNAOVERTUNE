class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    preload() {
        this.load.image('usagiflap', 'Level1-cover.jpg');
        this.load.image('crabrave', 'Level2-cover.jpg');
        this.load.image('asimslevel', 'Level3-cover.jpg');
        this.load.image('planetloop', 'Level4-cover.jpg');
        this.load.image('FINALBOSS', 'Level5-cover.jpg');
    }

    create() {

        const title = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 100, 
            'TUNATUNAOVERTUNE', 
            { fontSize: '46px', fill: '#FFF' }
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
            this.showlevelselector(title, playButton, tutorialButton, optionsButton);
        });

        const tutorialButton = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 40, 
            'Tutorial', 
            { fontSize: '32px', fill: '#FFF' }
        )
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            this.showtutorial(title, playButton, tutorialButton, optionsButton);
        });
        
        const optionsButton = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 100, 
            'Options', 
            { fontSize: '32px', fill: '#FFF' }
        )
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            this.showoptions(title, playButton, tutorialButton, optionsButton);
        });
        
        const subtextOptions = [
            'waow grape game!',
            'moosic gaem',
            'INDEV',
            'bit bugged',
            'MINECRAFT TEXT',
            'version 0.3!!!',
            'tahaaagame?!?!',
            'i am tuna',
            'dont talk to d ranks',
            'tunaovertime!!',
            'brrrrr',
            'CHATGPT HELP ME',
            'play when??',
            'better then before!',
            'its rly good!',
            'rythm game!?!'
        ];

        const randomSubtext = Phaser.Utils.Array.GetRandom(subtextOptions);

        this.subtext = this.add.text(
            this.cameras.main.centerX + 240, 
            this.cameras.main.centerY - 130, 
            randomSubtext, 
            {
                fontSize: '20px', 
                fill: '#FFD700',
                fontFamily: 'Courier New',
                fontStyle: 'bold'
            }
        )
        .setOrigin(0.5)
        .setAngle(40)
        .setShadow(2, 2, '#000', 2, true, true);

        this.tweens.add({
            targets: this.subtext,
            scaleX: 1.2,
            scaleY: 1.2,
            ease: 'Quad.easeInOut',
            duration: 500,
            yoyo: true,
            repeat: -1
        });
    }

    showlevelselector(title, playButton, tutorialButton, optionsButton) {
    
        if (title) title.destroy();
        if (playButton) playButton.destroy();
        if (tutorialButton) tutorialButton.destroy();
        if (optionsButton) optionsButton.destroy();
        if (this.subtext) this.subtext.destroy();

        title = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 150, 'LEVEL SELECTOR', { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);

        const previewImage = this.add.image(this.cameras.main.centerX, 210, 'usagiflap').setOrigin(0.5).setScale(0.3);

        const subtitle = this.add.text(this.cameras.main.centerX, 340, 'DEMO Stage', { fontSize: '28px', fill: '#AAA' }).setOrigin(0.5);

        playButton = this.add.text(this.cameras.main.centerX, 400, 'PLAY', { fontSize: '32px', fill: '#FFF' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.startGame();
            });

        const backButton = this.add.text(100, 230, 'BACK', { fontSize: '28px', fill: '#FFF' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
            
                title.destroy();
                previewImage.destroy();
                subtitle.destroy();
                playButton.destroy();
                backButton.destroy();
                nextButton.destroy();
                this.create();
            });

        const nextButton = this.add.text(this.cameras.main.width - 100, 230, 'NEXT', { fontSize: '28px', fill: '#FFF' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                
                title.destroy();
                previewImage.destroy();
                subtitle.destroy();
                playButton.destroy();
                backButton.destroy();
                nextButton.destroy();
                this.showLevelSelectorPage2();
            });
    }

    showLevelSelectorPage2() {

        const title = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 150, 'LEVEL SELECTOR', { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);

        const previewImage = this.add.image(this.cameras.main.centerX, 210, 'crabrave').setOrigin(0.5).setScale(0.3);

        const subtitle = this.add.text(this.cameras.main.centerX, 340, 'Crab Rave', { fontSize: '28px', fill: '#AAA' }).setOrigin(0.5);

        const playButton = this.add.text(this.cameras.main.centerX, 400, 'not added yet', { fontSize: '32px', fill: '#FFF' })
            .setOrigin(0.5)

        const backButton = this.add.text(100, 230, 'BACK', { fontSize: '28px', fill: '#FFF' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                title.destroy();
                previewImage.destroy();
                subtitle.destroy();
                playButton.destroy();
                backButton.destroy();
                nextButton.destroy();
                this.showlevelselector();
            });

        const nextButton = this.add.text(this.cameras.main.width - 100, 230, 'NEXT', { fontSize: '28px', fill: '#FFF' })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {

            title.destroy();
            previewImage.destroy();
            subtitle.destroy();
            playButton.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.showLevelSelectorPage3();
        });
    }

    showLevelSelectorPage3() {

    const title = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 150, 'LEVEL SELECTOR', { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);

    const previewImage = this.add.image(this.cameras.main.centerX, 210, 'asimslevel').setOrigin(0.5).setScale(0.3);

    const subtitle = this.add.text(this.cameras.main.centerX, 340, 'Asims Level', { fontSize: '28px', fill: '#AAA' }).setOrigin(0.5);

    const playButton = this.add.text(this.cameras.main.centerX, 400, 'not added yet', { fontSize: '32px', fill: '#FFF' })
        .setOrigin(0.5)

    const backButton = this.add.text(100, 230, 'BACK', { fontSize: '28px', fill: '#FFF' })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            title.destroy();
            previewImage.destroy();
            subtitle.destroy();
            playButton.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.showLevelSelectorPage2();
        });

        const nextButton = this.add.text(this.cameras.main.width - 100, 230, 'NEXT', { fontSize: '28px', fill: '#FFF' })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {

            title.destroy();
            previewImage.destroy();
            subtitle.destroy();
            playButton.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.showLevelSelectorPage4();
        });
    }

    showLevelSelectorPage4() {

    const title = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 150, 'LEVEL SELECTOR', { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);

    const previewImage = this.add.image(this.cameras.main.centerX, 210, 'planetloop').setOrigin(0.5).setScale(0.3);

    const subtitle = this.add.text(this.cameras.main.centerX, 340, 'Planet Loop', { fontSize: '28px', fill: '#AAA' }).setOrigin(0.5);

    const playButton = this.add.text(this.cameras.main.centerX, 400, 'not added yet', { fontSize: '32px', fill: '#FFF' })
        .setOrigin(0.5)

    const backButton = this.add.text(100, 230, 'BACK', { fontSize: '28px', fill: '#FFF' })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            title.destroy();
            previewImage.destroy();
            subtitle.destroy();
            playButton.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.showLevelSelectorPage3();
        });

        const nextButton = this.add.text(this.cameras.main.width - 100, 230, 'NEXT', { fontSize: '28px', fill: '#FFF' })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {

            title.destroy();
            previewImage.destroy();
            subtitle.destroy();
            playButton.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.showLevelSelectorPage5();
        });
    }
    
    showLevelSelectorPage5() {

    const title = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 150, 'LEVEL SELECTOR', { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);

    const previewImage = this.add.image(this.cameras.main.centerX, 210, 'FINALBOSS').setOrigin(0.5).setScale(0.3);

    const subtitle = this.add.text(this.cameras.main.centerX, 340, 'FINALBOSS', { fontSize: '28px', fill: '#AAA' }).setOrigin(0.5);

    const playButton = this.add.text(this.cameras.main.centerX, 400, 'not added yet', { fontSize: '32px', fill: '#FFF' })
        .setOrigin(0.5)

    const backButton = this.add.text(100, 230, 'BACK', { fontSize: '28px', fill: '#FFF' })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            title.destroy();
            previewImage.destroy();
            subtitle.destroy();
            playButton.destroy();
            backButton.destroy();
            this.showLevelSelectorPage4();
        });
    }
    
    showtutorial(title, playButton, tutorialButton, optionsButton) {
        if (title) title.destroy();
        if (playButton) playButton.destroy();
        if (tutorialButton) tutorialButton.destroy();
        if (optionsButton) optionsButton.destroy();
        if (this.subtext) this.subtext.destroy();

        this.showTutorialPage1();
    }

    showTutorialPage1() {
        const title = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 150, 
            'How to Play - Page 1', 
            { fontSize: '32px', fill: '#FFF' }
        ).setOrigin(0.5);

        const previewImage = this.add.image(
            this.cameras.main.centerX, 
            210, 
            'imagePage1'
        ).setOrigin(0.5).setScale(0.3);

        const backButton = this.add.text(
            100, 
            230, 
            'BACK', 
            { fontSize: '28px', fill: '#FFF' }
        ).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            title.destroy();
            previewImage.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.create();
        });

        const nextButton = this.add.text(
            this.cameras.main.width - 100, 
            230, 
            'NEXT', 
            { fontSize: '28px', fill: '#FFF' }
        ).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            title.destroy();
            previewImage.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.showTutorialPage2();
        });
    }

    showTutorialPage2() {
        const title = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 150, 
            'How to Play - Page 2', 
            { fontSize: '32px', fill: '#FFF' }
        ).setOrigin(0.5);

        const previewImage = this.add.image(
            this.cameras.main.centerX, 
            210, 
            'imagePage2'
        ).setOrigin(0.5).setScale(0.3);

        const backButton = this.add.text(
            100, 
            230, 
            'BACK', 
            { fontSize: '28px', fill: '#FFF' }
        ).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            title.destroy();
            previewImage.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.create();
        });

        const nextButton = this.add.text(
            this.cameras.main.width - 100, 
            230, 
            'NEXT', 
            { fontSize: '28px', fill: '#FFF' }
        ).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            title.destroy();
            previewImage.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.showTutorialPage3();
        });
    }

    showTutorialPage3() {
        const title = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 150, 
            'How to Play - Page 3', 
            { fontSize: '32px', fill: '#FFF' }
        ).setOrigin(0.5);

        const previewImage = this.add.image(
            this.cameras.main.centerX, 
            210, 
            'imagePage3'
        ).setOrigin(0.5).setScale(0.3);

        const backButton = this.add.text(
            100, 
            230, 
            'BACK', 
            { fontSize: '28px', fill: '#FFF' }
        ).setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            title.destroy();
            previewImage.destroy();
            backButton.destroy();
            this.create();
        });
    }
    
    showoptions(title, playButton, tutorialButton, optionsButton) {

        if (title) title.destroy();
        if (playButton) playButton.destroy();
        if (optionsButton) optionsButton.destroy();
        if (tutorialButton) tutorialButton.destroy();
        if (this.subtext) this.subtext.destroy();

        this.optionsTitle = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 150, 
            '(these dont work rn, go back)', 
            { fontSize: '32px', fill: '#FFF' }
        )
        .setOrigin(0.5);

        const keyBindingButton = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 60, 
            'Key Binding', 
            { fontSize: '28px', fill: '#FFF' }
        )
        .setOrigin(0.5)
        .setInteractive();

        const soundVolumeButton = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 60, 
            'Sound Volume', 
            { fontSize: '28px', fill: '#FFF' }
        )
        .setOrigin(0.5)
        .setInteractive();

        const backButton = this.add.text(100, 230, 'BACK', { fontSize: '28px', fill: '#FFF' })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            
            if (this.optionsTitle) this.optionsTitle.destroy();
            if (keyBindingButton) keyBindingButton.destroy();
            if (soundVolumeButton) soundVolumeButton.destroy();
            if (backButton) backButton.destroy();

            this.create();
        });
    }
            startGame() {
                this.scene.start('Usagiflap');
            }
        }

class Usagiflap extends Phaser.Scene {
    constructor() {
        super({
            key: 'Usagiflap',
            physics: {
                default: 'matter',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            }
        });
        this.laneColors = [0x00b8ff, 0x32cd32, 0x00719c, 0x228b22];
        this.isPaused = false;
        this.pauseMenu = null;
        this.music = null;
        this.musicStarted = false;
    }


    preload() {
        this.load.audio('demomusic', 'Level1-track.mp3');
        this.load.image('characterImage1', 'usagi1.png');
        this.load.image('characterImage2', 'usagi2.png');
        this.load.image('characterImage3', 'usagi3.png');
        this.load.image('characterImage4', 'usagi4.png');
    }

    create() {

        this.isPaused = false;
        this.time.timeScale = 1;
        this.matter.world.resume();
        
        if (this.music && this.music.isPlaying) {
            this.music.stop();
        }

        this.musicStarted = false;
        
        const platformWidth = this.cameras.main.width / 1.5;
        const platformHeight = 20;
        const platformY = this.cameras.main.height - 100;
        const partWidth = platformWidth / 4;

        this.platforms = [];

        const platformGraphics = this.add.graphics();
        platformGraphics.lineStyle(4, 0xFFFFFF, 1);
        platformGraphics.fillStyle(0x0000FF, 1);

        for (let i = 0; i < 4; i++) {
            const platformX = partWidth * i + partWidth / 2;
            
            platformGraphics.strokeRect(platformX - partWidth / 2, platformY - platformHeight / 2, partWidth, platformHeight);

            const platform = this.matter.add.rectangle(platformX, platformY, partWidth, platformHeight, { isStatic: true });
            this.platforms.push(platform);
        }

        this.player = this.matter.add.rectangle(partWidth / 2, platformY - 25, partWidth, 5, { isStatic: true });
        this.physics.world.setBounds(0, 0, this.cameras.main.width, this.cameras.main.height);

        if (!this.music) {
            this.music = this.sound.add('demomusic');
        }

        this.input.keyboard.on('keydown-A', () => {
            this.handlePlayerMove(0, 'characterImage1');
        });
        this.input.keyboard.on('keydown-S', () => {
            this.handlePlayerMove(1, 'characterImage3');
        });
        this.input.keyboard.on('keydown-D', () => {
            this.handlePlayerMove(2, 'characterImage2');
        });
        this.input.keyboard.on('keydown-F', () => {
            this.handlePlayerMove(3, 'characterImage4');
        });

        this.input.on('pointerdown', (pointer) => {
            const partWidth = this.cameras.main.width / 1.5 / 4;
            const section = Math.floor(pointer.x / partWidth);

            switch (section) {
                case 0:
                    this.handlePlayerMove(0, 'characterImage1');
                    break;
                case 1:
                    this.handlePlayerMove(1, 'characterImage3');
                    break;
                case 2:
                    this.handlePlayerMove(2, 'characterImage2');
                    break;
                case 3:
                    this.handlePlayerMove(3, 'characterImage4');
                    break;
                default:
                    break;
            }
        });

        this.score = 0;
        this.moveMade = false;

        this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '24px', fill: '#FFF' });
        this.streakText = this.add.text(10, 40, 'Streak: 0', { fontSize: '24px', fill: '#FFF' });

        this.character = this.add.image(this.cameras.main.width - 100, this.cameras.main.height - 200, 'characterImage1').setScale(0.3);

        this.pauseButton = this.add.text(this.cameras.main.width - 80, 20, 'Pause', { fontSize: '24px', fill: '#FFF' })
            .setInteractive()
            .on('pointerdown', () => this.pauseGame());

        const redBarHeight = 10;

        this.redBarMaxWidth = platformWidth;
        this.redBarWidth = platformWidth;
        
        this.redBar = this.add.rectangle(
            220,
            390,
            this.redBarWidth,
            redBarHeight,
            0xffffff
        ).setOrigin(0.5, 0.5);
        
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
          { time: 15 * beatInterval, lane: 2 },
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
          { time: 54 * beatInterval, lane: 0 },
          { time: 54.5 * beatInterval, lane: 2 },
          { time: 55 * beatInterval, lane: 2 },
          { time: 56 * beatInterval, lane: 1 },
          { time: 57 * beatInterval, lane: 1 },
          { time: 57.5 * beatInterval, lane: 3 },
          { time: 58 * beatInterval, lane: 1 },
          { time: 58.5 * beatInterval, lane: 3 },
          { time: 59 * beatInterval, lane: 2 },
          { time: 59.5 * beatInterval, lane: 2 },
          { time: 60 * beatInterval, lane: 2 },
          { time: 60.5 * beatInterval, lane: 0 },
          { time: 62 * beatInterval, lane: 0 },
          { time: 62.5 * beatInterval, lane: 1 },
          { time: 63 * beatInterval, lane: 2 },
          { time: 63.5 * beatInterval, lane: 2 },
          { time: 63.7 * beatInterval, lane: 3 },
          { time: 65 * beatInterval, lane: 1 },
          { time: 66 * beatInterval, lane: 0 },
          { time: 67 * beatInterval, lane: 1 },
          { time: 68 * beatInterval, lane: 0 },
          { time: 69 * beatInterval, lane: 1 },
          { time: 70 * beatInterval, lane: 1 },
          { time: 71 * beatInterval, lane: 0 },
          { time: 72 * beatInterval, lane: 0 },
          { time: 73 * beatInterval, lane: 1 },
          { time: 74 * beatInterval, lane: 0 },
          { time: 75 * beatInterval, lane: 1 },
          { time: 76 * beatInterval, lane: 1 },
          { time: 77 * beatInterval, lane: 0 },
          { time: 78 * beatInterval, lane: 1 },
          { time: 79 * beatInterval, lane: 1 },
          { time: 80 * beatInterval, lane: 1 },
          { time: 81 * beatInterval, lane: 2 },
          { time: 82 * beatInterval, lane: 3 },
          { time: 83 * beatInterval, lane: 2 },
          { time: 84 * beatInterval, lane: 3 },
          { time: 85 * beatInterval, lane: 2 },
          { time: 86 * beatInterval, lane: 2 },
          { time: 87 * beatInterval, lane: 3 },
          { time: 88 * beatInterval, lane: 3 },
          { time: 89 * beatInterval, lane: 2 },
          { time: 90 * beatInterval, lane: 3 },
          { time: 91 * beatInterval, lane: 2 },
          { time: 92 * beatInterval, lane: 2 },
          { time: 93 * beatInterval, lane: 3 },
          { time: 94 * beatInterval, lane: 2 },
          { time: 95 * beatInterval, lane: 2 },
          { time: 96 * beatInterval, lane: 2 },
          { time: 97 * beatInterval, lane: 1 },
          { time: 97.5 * beatInterval, lane: 2 },
          { time: 98 * beatInterval, lane: 3 },
          { time: 98.5 * beatInterval, lane: 0 },
          { time: 99 * beatInterval, lane: 0 },
          { time: 99.5 * beatInterval, lane: 1 },
          { time: 100 * beatInterval, lane: 2 },
          { time: 100.5 * beatInterval, lane: 3 },
          { time: 101 * beatInterval, lane: 0 },
          { time: 101.5 * beatInterval, lane: 0 },
          { time: 102 * beatInterval, lane: 1 },
          { time: 102.5 * beatInterval, lane: 2 },
          { time: 103 * beatInterval, lane: 0 },
          { time: 103.5 * beatInterval, lane: 1 },
          { time: 104 * beatInterval, lane: 2 },
          { time: 104.5 * beatInterval, lane: 1 },
          { time: 105 * beatInterval, lane: 2 },
          { time: 105.5 * beatInterval, lane: 0 },
          { time: 106 * beatInterval, lane: 1 },
          { time: 106.5 * beatInterval, lane: 2 },
          { time: 107 * beatInterval, lane: 3 },
          { time: 107.5 * beatInterval, lane: 0 },
          { time: 108 * beatInterval, lane: 0 },
          { time: 108.5 * beatInterval, lane: 1 },
          { time: 109 * beatInterval, lane: 2 },
          { time: 109.5 * beatInterval, lane: 3 },
          { time: 110 * beatInterval, lane: 0 },
          { time: 110.5 * beatInterval, lane: 0 },
          { time: 111 * beatInterval, lane: 1 },
          { time: 111.5 * beatInterval, lane: 2 },
          { time: 112 * beatInterval, lane: 3 },
          { time: 112.5 * beatInterval, lane: 0 },
          { time: 112.5 * beatInterval, lane: 3 },
          { time: 113 * beatInterval, lane: 0 },
          { time: 113.5 * beatInterval, lane: 3 },
          { time: 114 * beatInterval, lane: 0 },
          { time: 114.5 * beatInterval, lane: 3 },
          { time: 115 * beatInterval, lane: 0 },
          { time: 115.5 * beatInterval, lane: 3 },
          { time: 116 * beatInterval, lane: 0 },
          { time: 116.5 * beatInterval, lane: 1 },
          { time: 117 * beatInterval, lane: 2 },
          { time: 117.5 * beatInterval, lane: 1 },
          { time: 118 * beatInterval, lane: 2 },
          { time: 118.5 * beatInterval, lane: 1 },
          { time: 119 * beatInterval, lane: 2 },
          { time: 119.5 * beatInterval, lane: 1 },
          { time: 120 * beatInterval, lane: 2 },
          { time: 120.5 * beatInterval, lane: 0 },
          { time: 121 * beatInterval, lane: 3 },
          { time: 121.5 * beatInterval, lane: 3 },
          { time: 122 * beatInterval, lane: 0 },
          { time: 122.5 * beatInterval, lane: 3 },
          { time: 123 * beatInterval, lane: 3 },
          { time: 123.5 * beatInterval, lane: 3 },
          { time: 124 * beatInterval, lane: 0 },
          { time: 124.5 * beatInterval, lane: 2 },
          { time: 125 * beatInterval, lane: 1 },
          { time: 125.5 * beatInterval, lane: 1 },
          { time: 126 * beatInterval, lane: 1 },
          { time: 126.5 * beatInterval, lane: 0 },
          { time: 127 * beatInterval, lane: 0 },
          { time: 127.5 * beatInterval, lane: 3 },
          { time: 128 * beatInterval, lane: 0 },
          { time: 128.5 * beatInterval, lane: 3 },
          { time: 129 * beatInterval, lane: 0 },
          { time: 129.5 * beatInterval, lane: 3 },
          { time: 130 * beatInterval, lane: 2 },
          { time: 130.5 * beatInterval, lane: 1 },
          { time: 131 * beatInterval, lane: 2 },
          { time: 131.5 * beatInterval, lane: 1 },
          { time: 132 * beatInterval, lane: 2 },
          { time: 132.5 * beatInterval, lane: 1 },
          { time: 133 * beatInterval, lane: 2 },
          { time: 133.5 * beatInterval, lane: 1 },
          { time: 134 * beatInterval, lane: 2 },
          { time: 134.5 * beatInterval, lane: 3 },
          { time: 135 * beatInterval, lane: 0 },
          { time: 135.5 * beatInterval, lane: 0 },
          { time: 136 * beatInterval, lane: 3 },
          { time: 136.5 * beatInterval, lane: 0 },
          { time: 137 * beatInterval, lane: 1 },
          { time: 137.5 * beatInterval, lane: 3 },
          { time: 138 * beatInterval, lane: 0 },
          { time: 138.5 * beatInterval, lane: 1 },
          { time: 139 * beatInterval, lane: 2 },
          { time: 139.5 * beatInterval, lane: 1 },
          { time: 140 * beatInterval, lane: 0 },
          { time: 140.5 * beatInterval, lane: 3 },
          { time: 141 * beatInterval, lane: 0 },
          { time: 141.5 * beatInterval, lane: 0 },
          { time: 142 * beatInterval, lane: 3 },
          { time: 142.5 * beatInterval, lane: 0 },
          { time: 143 * beatInterval, lane: 0 },
          { time: 143.5 * beatInterval, lane: 0 },
          { time: 144 * beatInterval, lane: 0 },
          { time: 144.5 * beatInterval, lane: 3 },
          { time: 145 * beatInterval, lane: 0 },
          { time: 145.5 * beatInterval, lane: 3 },
          { time: 146 * beatInterval, lane: 0 },
          { time: 146.5 * beatInterval, lane: 3 },
          { time: 147 * beatInterval, lane: 0 },
          { time: 147.5 * beatInterval, lane: 3 },
          { time: 148 * beatInterval, lane: 0 },
          { time: 148.5 * beatInterval, lane: 3 },
          { time: 149 * beatInterval, lane: 0 },
          { time: 149.5 * beatInterval, lane: 3 },
          { time: 150 * beatInterval, lane: 0 },
          { time: 150.5 * beatInterval, lane: 3 },
          { time: 151 * beatInterval, lane: 0 },
          { time: 151.5 * beatInterval, lane: 3 },
          { time: 152 * beatInterval, lane: 0 },
          { time: 152.5 * beatInterval, lane: 3 },
          { time: 153 * beatInterval, lane: 0 },
          { time: 153.5 * beatInterval, lane: 3 },
          { time: 154 * beatInterval, lane: 0 },
          { time: 154.5 * beatInterval, lane: 3 },
          { time: 155 * beatInterval, lane: 0 },
          { time: 155.5 * beatInterval, lane: 3 },
          { time: 156 * beatInterval, lane: 0 },
          { time: 156.5 * beatInterval, lane: 3 },
          { time: 157 * beatInterval, lane: 0 },
          { time: 157.5 * beatInterval, lane: 3 },
          { time: 158 * beatInterval, lane: 0 },
          { time: 158.5 * beatInterval, lane: 3 },
          { time: 159 * beatInterval, lane: 0 },
          { time: 159.5 * beatInterval, lane: 3 },
          { time: 160 * beatInterval, lane: 0 },
          { time: 160 * beatInterval, lane: 1 },
          { time: 160.5 * beatInterval, lane: 3 },
          { time: 161 * beatInterval, lane: 0 },
          { time: 161 * beatInterval, lane: 2 },
          { time: 161.5 * beatInterval, lane: 3 },
          { time: 162 * beatInterval, lane: 0 },
          { time: 162 * beatInterval, lane: 1 },
          { time: 162.5 * beatInterval, lane: 3 },
          { time: 163 * beatInterval, lane: 0 },
          { time: 163 * beatInterval, lane: 2 },
          { time: 163.5 * beatInterval, lane: 3 },
          { time: 164 * beatInterval, lane: 0 },
          { time: 164 * beatInterval, lane: 1 },
          { time: 164.5 * beatInterval, lane: 3 },
          { time: 165 * beatInterval, lane: 0 },
          { time: 165 * beatInterval, lane: 1 },
          { time: 165.5 * beatInterval, lane: 3 },
          { time: 166 * beatInterval, lane: 0 },
          { time: 166 * beatInterval, lane: 2 },
          { time: 166.5 * beatInterval, lane: 3 },
          { time: 167 * beatInterval, lane: 0 },
          { time: 167 * beatInterval, lane: 1 },
          { time: 167.5 * beatInterval, lane: 3 },
          { time: 168 * beatInterval, lane: 0 },
          { time: 168 * beatInterval, lane: 1 },
          { time: 168.5 * beatInterval, lane: 3 },
          { time: 169 * beatInterval, lane: 0 },
          { time: 169 * beatInterval, lane: 2 },
          { time: 169.5 * beatInterval, lane: 3 },
          { time: 170 * beatInterval, lane: 0 },
          { time: 170 * beatInterval, lane: 2 },
          { time: 170.5 * beatInterval, lane: 3 },
          { time: 171 * beatInterval, lane: 0 },
          { time: 171 * beatInterval, lane: 1 },
          { time: 171.5 * beatInterval, lane: 3 },
          { time: 172 * beatInterval, lane: 3 },
          { time: 172 * beatInterval, lane: 1 },
          { time: 172.5 * beatInterval, lane: 0 },
          { time: 173 * beatInterval, lane: 2 },
          { time: 174 * beatInterval, lane: 2 },
          { time: 175 * beatInterval, lane: 2 },
        ];

        this.notes = [];
        this.highestStreak = 0;
        this.currentStreak = 0;
        
        this.beatmap.forEach((note, index) => {
            this.time.addEvent({
                delay: note.time,
                callback: () => {
                    const spawnedNote = this.spawnNote(note);
                    this.notes.push(spawnedNote);

                    if (!this.musicStarted && index === 0) {

                        this.time.delayedCall(2000, () => {
                            this.music.play();
                        });
                        this.musicStarted = true;
                    }
                    
                    if (index === this.beatmap.length - 1) {
                                    this.time.delayedCall(5000, () => {
                                        this.checkLevelCompletion();
                                    });
                                }
                            }
                        });
                    });
    }

    reduceRedBar(reductionAmount = 20) {
        this.redBarWidth -= reductionAmount;
        if (this.redBarWidth < 0) this.redBarWidth = 0;

        this.redBar.displayWidth = this.redBarWidth;

        if (this.redBarWidth === 0) {
            this.levelFailed();
        }
    }

    increaseRedBar() {
        const increaseAmount = 10;
        this.redBarWidth += increaseAmount;
        if (this.redBarWidth > this.redBarMaxWidth) this.redBarWidth = this.redBarMaxWidth;

        this.redBar.displayWidth = this.redBarWidth;
    }

    levelFailed() {
        
        if (this.levelFailedTriggered) {
            return;
        }
        this.levelFailedTriggered = true;

        this.isPaused = true;
        this.time.timeScale = 0;
        this.matter.world.pause();
        if (this.music && this.music.isPlaying) {
            this.music.stop();
        }

        this.levelFailedText = this.add.text(
            this.cameras.main.width / 2, 
            this.cameras.main.height / 3, 
            'Level Failed', 
            { fontSize: '48px', fill: '#ff0000' }
        ).setOrigin(0.5);
        
        const tips = [
            'L bozo',
            'git gud',
            'noob',
            'how did u even miss that',
            'loser alert',
        ];

        const randomTip = Phaser.Utils.Array.GetRandom(tips);
        this.tipText = this.add.text(
            this.cameras.main.width / 2, 
            this.cameras.main.height / 2, 
            `${randomTip}`, 
            { fontSize: '24px', fill: '#ffffff' }
        ).setOrigin(0.5);

        this.scoreText = this.add.text(
            this.cameras.main.width / 2, 
            this.cameras.main.height / 1.5, 
            `Score: ${this.score}`, 
            { fontSize: '32px', fill: '#ffffff' }
        ).setOrigin(0.5);
        
        this.backButton = this.add.text(
            this.cameras.main.width / 2, 
            this.cameras.main.height / 1.2, 
            'Back', 
            { fontSize: '32px', fill: '#ffffff' }
        ).setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.cleanUpLevelFailed();
                this.scene.start('TitleScene');
            });
    }

    cleanUpLevelFailed() {
        if (this.levelFailedText) this.levelFailedText.destroy();
        if (this.tipText) this.tipText.destroy();
        if (this.scoreText) this.scoreText.destroy();
        if (this.backButton) this.backButton.destroy();

        this.levelFailedTriggered = false;
    }
    
    updateStreak(isSuccessfulHit) {
        if (isSuccessfulHit) {
            this.currentStreak++;
            if (this.currentStreak > this.highestStreak) {
                this.highestStreak = this.currentStreak;
            }
        } else {
            this.currentStreak = 0;
        }
    }

    checkLevelCompletion() {
        const activeNotes = this.notes.filter(note => note && note.active);
        
        if (activeNotes.length === 0) {
            this.showLevelClearMenu();
        }
    }
    
    movePlayerTo(lane) {
        const platformWidth = this.cameras.main.width / 1.5;
        const partWidth = platformWidth / 4;
        const targetX = partWidth * lane + partWidth / 2;
        
        this.matter.body.setPosition(this.player, { x: targetX, y: this.player.position.y });
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
            }
        });
    }

    handlePlayerMove(lane, characterImage) {
        this.movePlayerTo(lane);
        this.character.setTexture(characterImage);
        this.moveMade = true;
        
        this.time.delayedCall(0, () => {
            if (!this.noteScored) {
                this.currentStreak = 0;
                this.reduceRedBar(10);
                this.updateScoreAndStreak();
            }
            this.moveMade = false;
        });
    }
    
    checkNoteHit(lane, note) {
        const platformWidth = this.cameras.main.width / 1.5;
        const partWidth = platformWidth / 4;
        const playerX = this.player.position.x;
        const playerLane = Math.floor(playerX / partWidth);

        if (playerLane === lane && note.y >= this.cameras.main.height - 100) {
            this.score++;
            this.currentStreak++;
            if (this.currentStreak > this.highestStreak) {
                this.highestStreak = this.currentStreak;
            }
            
            this.updateScoreAndStreak();
            this.increaseRedBar();
            this.noteScored = true;
            this.createPopEffect(lane);
            
            if (!this.musicStarted && note === this.beatmap[0]) {
                this.music.play();
                this.musicStarted = true;
            }
        } else {
            this.currentStreak = 0;
            this.updateScoreAndStreak();
            this.reduceRedBar();
            this.noteScored = false;
            this.createMissEffect(lane);
        }

        note.destroy();
    }

    createPopEffect(lane) {
        const platformWidth = this.cameras.main.width / 1.5;
        const partWidth = platformWidth / 4;
        const platformHeight = 40; 

        const platformX = partWidth * lane + partWidth / 2;
        const platformY = this.cameras.main.height - 100;

        const popEffectGraphics = this.add.graphics();
        popEffectGraphics.lineStyle(6, 0xFFFFFF, 1);

        popEffectGraphics.strokeRect(
            platformX - partWidth / 2, 
            platformY - platformHeight / 2, 
            partWidth, 
            platformHeight
        );

        this.tweens.add({
            targets: popEffectGraphics,
            scaleX: 1.2,
            scaleY: 1.2, 
            alpha: 0,    
            duration: 400,
            onComplete: () => {
                popEffectGraphics.destroy(); 
            }
        });
    }

    createMissEffect(lane) {
        const platformWidth = this.cameras.main.width / 1.5;
        const partWidth = platformWidth / 4;
        const platformY = this.cameras.main.height - 100;

        const platformX = partWidth * lane + partWidth / 2;

        const missText = this.add.text(
            platformX, 
            platformY - 50,
            'MISS', 
            {
                fontSize: '32px', 
                fill: '#FF0000', 
                fontFamily: 'PixelFont',
            }
        ).setOrigin(0.5);

        this.tweens.add({
            targets: missText,
            y: platformY - 100,
            alpha: 0,
            duration: 500,
            ease: 'Power1',
            onComplete: () => {
                missText.destroy();
            }
        });
    }
    
    updateScoreAndStreak() {
        this.scoreText.setText('Score: ' + this.score);
        this.streakText.setText('Streak: ' + this.currentStreak);
    }

    pauseGame() {
        if (this.isPaused) return;

        this.isPaused = true;
        this.physics.world.isPaused = true;
        this.music?.pause();
        this.time.timeScale = 0;
        this.matter.world.pause();
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
                this.music = null;
                this.scene.stop('LevelScene');
                this.scene.start('TitleScene');
            });

        this.pauseMenu.add([menuBackground, resumeButton, backButton]);
        this.children.bringToTop(this.pauseMenu);
    }

    resumeGame() {
        this.isPaused = false;
        this.physics.world.isPaused = false;
        this.time.timeScale = 1;
        this.matter.world.resume();
        this.music?.resume();
    
        this.pauseMenu.destroy();
    }

    showLevelClearMenu() {

        this.music.stop();
        this.physics.pause();
        this.isPaused = true;

        const levelClearMenu = this.add.container(this.cameras.main.width / 2, this.cameras.main.height / 2);

        const menuBackground = this.add.rectangle(0, 0, 300, 200, 0x000000, 0.8).setOrigin(0.5);

        const titleText = this.add.text(0, -70, 'Level Cleared!', { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);

        const rankText = this.add.text(0, -20, `RANK: ${this.calculateRank()}`, { fontSize: '24px', fill: '#FFF' }).setOrigin(0.5);
        const scoreText = this.add.text(0, 20, `SCORE: ${this.score}`, { fontSize: '24px', fill: '#FFF' }).setOrigin(0.5);
        const streakText = this.add.text(0, 60, `STREAK: ${this.highestStreak}`, { fontSize: '24px', fill: '#FFF' }).setOrigin(0.5);

        const backButton = this.add.text(0, 100, 'Back', { fontSize: '24px', fill: '#FFF' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.music?.stop();
                this.music = null;
                this.scene.stop('LevelScene');
                this.scene.start('TitleScene');
            });

        levelClearMenu.add([menuBackground, titleText, rankText, scoreText, streakText, backButton]);
        this.children.bringToTop(levelClearMenu);
    }

    calculateRank() {
    
        if (this.score >= 250) {
            return 'S';
        } else if (this.score >= 200) {
            return 'A';
        } else if (this.score >= 180) {
            return 'B';
        } else if (this.score >= 150) {
            return 'C';
        } else {
            return 'D';
        }
    }
    
    update() {
        if (this.isPaused) return;
    }
}

const config = {
  type: Phaser.AUTO,
  width: 650,
  height: 450,
  parent: 'game',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [TitleScene, Usagiflap],
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 0.5 },
      debug: true
    }
  }
};
        
const game = new Phaser.Game(config);