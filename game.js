class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    preload() {

        let width = this.cameras.main.width;
        let height = this.cameras.main.height;

        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0xffffff, 0.2);
        progressBox.fillRect(width / 4 - 10, height / 2 - 25, width / 2 + 20, 50);

        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x00b8ff, 1);
            progressBar.fillRect(width / 4, height / 2 - 15, (width / 2) * value, 30);
        });

        this.load.image('usagiflap', 'Level1-cover.jpg');
        this.load.image('asimslevel', 'Level2-cover.jpg');
        this.load.image('Henceforth', 'Level3-cover.jpg');
        this.load.image('planetloop', 'Level4-cover.jpg');
        this.load.image('FINALBOSS', 'Level5-cover.jpg');
        this.load.image('Omega Rythm', 'Level6-cover.jpg');
        this.load.image('playbutton', 'playbutton.png');
        this.load.image('tutorialbutton', 'tutorialbutton.png');
        this.load.image('nextbutton', 'nextbutton.png');
        this.load.image('exitbutton', 'exitbutton.png');
        this.load.image('creditsbutton', 'creditsbutton.png');
        this.load.image('creditsbutton2', 'creditsbutton2.png');
        this.load.image('optionsbutton', 'optionsbutton.png');
        this.load.image('backbutton', 'backbutton.png');
        this.load.image('nextbutton', 'nextbutton.png');
        this.load.image('englishbutton', 'englishbutton.png')
        this.load.image('urdubutton', 'urdubutton.png')
        this.load.image('startbutton', 'startbutton.png');
        this.load.image('englishtutorialimage1', 'englishtutorialimage1.jpg');
        this.load.image('englishtutorialimage2', 'englishtutorialimage2.jpg');
        this.load.image('englishtutorialimage3', 'englishtutorialimage3.jpg');
        this.load.image('englishtutorialimage4', 'englishtutorialimage4.png');
        this.load.image('urdututorialimage1', 'urdututorialimage1.png');
        this.load.image('urdututorialimage2', 'urdututorialimage2.jpg');
        
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });
    }

    create() {

        const title = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 100, 
            'TUNATUNAOVERTUNE', 
            { fontSize: '46px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif' }
        )
        .setOrigin(0.5)
        .setShadow(2, 2, '#000', 2, true, true);

        const playButton = this.add.image(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 20, 
            'playbutton'
        )
        .setOrigin(0.5)
        .setScale(0.35);
        this.addButtonEffects(playButton);
        
        playButton.on('pointerdown', () => {
            this.showlevelselector(title, playButton, optionsButton, creditsButton);
        });

        
        const optionsButton = this.add.image(
            this.cameras.main.centerX - 45,
            this.cameras.main.centerY + 110, 
            'optionsbutton'
        )
        .setOrigin(0.5)
        .setScale(0.5);
        this.addButtonEffects(optionsButton);
        optionsButton.on('pointerdown', () => {
            this.showoptions(title, playButton, optionsButton, creditsButton);
        });

        const creditsButton = this.add.image(
            this.cameras.main.centerX + 45,
            this.cameras.main.centerY + 110, 
            'creditsbutton'
        )
        .setOrigin(0.5)
        .setScale(0.25);
        this.addButtonEffects(creditsButton);
        creditsButton.on('pointerdown', () => {
            this.showInfo(title, playButton, optionsButton, creditsButton);
        });
        
        const subtextOptions = [
            'waow grape game!',
            'moosic gaem',
            'INDEV',
            'bit bugged',
            'MINECRAFT TEXT',
            'version 0.4!!!',
            'tahaaagame?!?!',
            'your refrencing a null pointer!',
            'dont talk to D ranks',
            'tunaovertime!!',
            'stobery',
            'CHATGPT HELP ME',
            'play when??',
            'better then before!',
            'its rly good!',
            'rythm game!?!'
        ];

        const randomSubtext = Phaser.Utils.Array.GetRandom(subtextOptions);

        this.subtext = this.add.text(
            this.cameras.main.centerX + 200, 
            this.cameras.main.centerY - 55, 
            randomSubtext, 
            {
                fontSize: '20px', 
                fill: '#FFD700',
                fontFamily: 'Courier New',
                fontStyle: 'bold'
            }
        )
        .setOrigin(0.5)
        .setAngle(20)
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
    
    showlevelselector(title, playButton, optionsButton, creditsButton) {
    
        if (title) title.destroy();
        if (playButton) playButton.destroy();
        if (optionsButton) optionsButton.destroy();
        if (creditsButton && creditsButton.destroy) {creditsButton.destroy();}
        if (this.subtext) this.subtext.destroy();

        title = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 190, 'LEVEL SELECTOR', { fontSize: '32px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif',}).setOrigin(0.5);
        
        const difficultyText = this.add.text(this.cameras.main.centerX - 70, 330, 'Difficulty:', { fontSize: '28px', fill: '#FFF', fontfamily: 'Geneva, Verdana, sans-serif' }).setOrigin(0.5);

        const difficultyRate = this.add.text(this.cameras.main.centerX + 70, 330, 'EASY', { fontSize: '28px', fill: '#90EE90', fontFamily: 'Comic Sans MS'}).setOrigin(0.5);

        const previewImage = this.add.image(this.cameras.main.centerX, 160, 'usagiflap').setOrigin(0.5).setScale(0.3);

        const subtitle = this.add.text(this.cameras.main.centerX, 280, 'Usagi Flap', { fontSize: '28px', fill: '#FFF', fontfamily: 'Comic Sans MS'}).setOrigin(0.5);

        playButton = this.add.image(this.cameras.main.centerX, 390, 'playbutton')
            .setOrigin(0.5)
            .setScale(0.25);
            this.addButtonEffects(playButton);
            playButton.on('pointerdown', () => {
                this.startGame();
            });

        const backButton = this.add.image(100, 230, 'exitbutton')
            .setOrigin(0.5)
            .setScale(0.35);
            this.addButtonEffects(backButton);
            backButton.on('pointerdown', () => {
            
                title.destroy();
                previewImage.destroy();
                subtitle.destroy();
                playButton.destroy();
                backButton.destroy();
                nextButton.destroy();
                difficultyRate.destroy();
                difficultyText.destroy();
                this.create();
            });

        const nextButton = this.add.image(this.cameras.main.width - 100, 230, 'nextbutton')
            .setOrigin(0.5)
            .setScale(0.7);
            this.addButtonEffects(nextButton);
            nextButton.on('pointerdown', () => {
                
                title.destroy();
                previewImage.destroy();
                subtitle.destroy();
                playButton.destroy();
                backButton.destroy();
                nextButton.destroy();
                difficultyRate.destroy();
                difficultyText.destroy();
                this.showLevelSelectorPage2();
            });
    }

    showLevelSelectorPage2() {

    const title = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 190, 'LEVEL SELECTOR', { fontSize: '32px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif',}).setOrigin(0.5);

        const difficultyText = this.add.text(this.cameras.main.centerX - 70, 330, 'Difficulty:', { fontSize: '28px', fill: '#FFF', fontfamily: 'Geneva, Verdana, sans-serif' }).setOrigin(0.5);

        const difficultyRate = this.add.text(this.cameras.main.centerX + 70, 330, 'EASY', { fontSize: '28px', fill: '#90EE90', fontFamily: 'Comic Sans MS'}).setOrigin(0.5);

        const previewImage = this.add.image(this.cameras.main.centerX, 160, 'asimslevel').setOrigin(0.5).setScale(0.3);

        const subtitle = this.add.text(this.cameras.main.centerX, 280, 'Asim*s Level', { fontSize: '28px', fill: '#FFF', fontfamily: 'Comic Sans MS'}).setOrigin(0.5);


        const backButton = this.add.image(100, 230, 'backbutton')
            .setOrigin(0.5)
            .setScale(0.7);
            this.addButtonEffects(backButton);
            backButton.on('pointerdown', () => {

                title.destroy();
                previewImage.destroy();
                subtitle.destroy();
                backButton.destroy();
                nextButton.destroy();
                difficultyRate.destroy();
                difficultyText.destroy();
                this.showlevelselector();
            });

        const nextButton = this.add.image(this.cameras.main.width - 100, 230, 'nextbutton')
            .setOrigin(0.5)
            .setScale(0.7);
            this.addButtonEffects(nextButton);
            nextButton.on('pointerdown', () => {

                title.destroy();
                previewImage.destroy();
                subtitle.destroy();
                backButton.destroy();
                nextButton.destroy();
                difficultyRate.destroy();
                difficultyText.destroy();
                this.showLevelSelectorPage3();
            });
    }
    
    showLevelSelectorPage3() {

    const title = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 190, 'LEVEL SELECTOR', { fontSize: '32px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif',}).setOrigin(0.5);

        const difficultyText = this.add.text(this.cameras.main.centerX - 70, 330, 'Difficulty:', { fontSize: '28px', fill: '#FFF', fontfamily: 'Geneva, Verdana, sans-serif' }).setOrigin(0.5);

        const difficultyRate = this.add.text(this.cameras.main.centerX + 70, 330, ' Normal', { fontSize: '28px', fill: '#FFFF00', fontFamily: 'Comic Sans MS'}).setOrigin(0.5);

        const previewImage = this.add.image(this.cameras.main.centerX, 160, 'henceforth').setOrigin(0.5).setScale(0.3);

        const subtitle = this.add.text(this.cameras.main.centerX, 280, 'Null', { fontSize: '28px', fill: '#FFF', fontfamily: 'Comic Sans MS'}).setOrigin(0.5);


        const backButton = this.add.image(100, 230, 'backbutton')
            .setOrigin(0.5)
            .setScale(0.7);
            this.addButtonEffects(backButton);
            backButton.on('pointerdown', () => {

                title.destroy();
                previewImage.destroy();
                subtitle.destroy();
                backButton.destroy();
                nextButton.destroy();
                difficultyRate.destroy();
                difficultyText.destroy();
                this.showLevelSelectorPage2();
            });

        const nextButton = this.add.image(this.cameras.main.width - 100, 230, 'nextbutton')
            .setOrigin(0.5)
            .setScale(0.7);
            this.addButtonEffects(nextButton);
            nextButton.on('pointerdown', () => {

                title.destroy();
                previewImage.destroy();
                subtitle.destroy();
                backButton.destroy();
                nextButton.destroy();
                difficultyRate.destroy();
                difficultyText.destroy();
                this.showLevelSelectorPage4();
            });
    }

    showLevelSelectorPage4() {

    const title = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 190, 'LEVEL SELECTOR', { fontSize: '32px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif',}).setOrigin(0.5);

        const difficultyText = this.add.text(this.cameras.main.centerX - 70, 330, 'Difficulty:', { fontSize: '28px', fill: '#FFF', fontfamily: 'Geneva, Verdana, sans-serif' }).setOrigin(0.5);

        const difficultyRate = this.add.text(this.cameras.main.centerX + 70, 330, ' Normal', { fontSize: '28px', fill: '#FFFF00', fontFamily: 'Comic Sans MS'}).setOrigin(0.5);

        const previewImage = this.add.image(this.cameras.main.centerX, 160, 'planetloop').setOrigin(0.5).setScale(0.3);

        const subtitle = this.add.text(this.cameras.main.centerX, 280, 'Planet Loop', { fontSize: '28px', fill: '#FFF', fontfamily: 'Comic Sans MS'}).setOrigin(0.5);


        const backButton = this.add.image(100, 230, 'backbutton')
            .setOrigin(0.5)           
            .setScale(0.7);
            this.addButtonEffects(backButton);
            backButton.on('pointerdown', () => {

                title.destroy();
                previewImage.destroy();
                subtitle.destroy();
                backButton.destroy();
                nextButton.destroy();
                difficultyRate.destroy();
                difficultyText.destroy();
                this.showLevelSelectorPage3();
            });

        const nextButton = this.add.image(this.cameras.main.width - 100, 230, 'nextbutton')
            .setOrigin(0.5)
            .setScale(0.7);
            this.addButtonEffects(nextButton);
            nextButton.on('pointerdown', () => {

                title.destroy();
                previewImage.destroy();
                subtitle.destroy();
                backButton.destroy();
                nextButton.destroy();
                difficultyRate.destroy();
                difficultyText.destroy();
                this.showLevelSelectorPage5();
            });
    }

    showLevelSelectorPage5() {

    const title = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 190, 'LEVEL SELECTOR', { fontSize: '32px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif',}).setOrigin(0.5);

        const difficultyText = this.add.text(this.cameras.main.centerX - 70, 330, 'Difficulty:', { fontSize: '28px', fill: '#FFF', fontfamily: 'Geneva, Verdana, sans-serif' }).setOrigin(0.5);

        const difficultyRate = this.add.text(this.cameras.main.centerX + 70, 330, 'Hard', { fontSize: '28px', fill: '#FF0000', fontFamily: 'Comic Sans MS'}).setOrigin(0.5);

        const previewImage = this.add.image(this.cameras.main.centerX, 160, 'FINALBOSS').setOrigin(0.5).setScale(0.3);

        const subtitle = this.add.text(this.cameras.main.centerX, 280, 'Final Boss', { fontSize: '28px', fill: '#FFF', fontfamily: 'Comic Sans MS'}).setOrigin(0.5);


        const backButton = this.add.image(100, 230, 'backbutton')
            .setOrigin(0.5)
            .setScale(0.7);
            this.addButtonEffects(backButton);
            backButton.on('pointerdown', () => {

                title.destroy();
                previewImage.destroy();
                subtitle.destroy();
                backButton.destroy();
                nextButton.destroy();
                difficultyRate.destroy();
                difficultyText.destroy();
                this.showLevelSelectorPage4();
            });

        const nextButton = this.add.image(this.cameras.main.width - 100, 230, 'nextbutton')
            .setOrigin(0.5)
            .setScale(0.7);
            this.addButtonEffects(nextButton);
            nextButton.on('pointerdown', () => {

                title.destroy();
                previewImage.destroy();
                subtitle.destroy();
                backButton.destroy();
                nextButton.destroy();
                difficultyRate.destroy();
                difficultyText.destroy();
                this.showLevelSelectorPage6();
            });
    }

    showLevelSelectorPage6() {

    const title = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 190, 'LEVEL SELECTOR', { fontSize: '32px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif',}).setOrigin(0.5);

        const difficultyText = this.add.text(this.cameras.main.centerX - 70, 330, 'Difficulty:', { fontSize: '28px', fill: '#FFF', fontfamily: 'Geneva, Verdana, sans-serif' }).setOrigin(0.5);

        const difficultyRate = this.add.text(this.cameras.main.centerX + 70, 330, '        Undefined', { fontSize: '28px', fill: '#DC143C', fontFamily: 'Comic Sans MS'}).setOrigin(0.5);

        const previewImage = this.add.image(this.cameras.main.centerX, 160, 'omegarythm').setOrigin(0.5).setScale(0.3);

        const subtitle = this.add.text(this.cameras.main.centerX, 280, 'Omega Rythm', { fontSize: '28px', fill: '#FFF', fontfamily: 'Comic Sans MS'}).setOrigin(0.5);

        const backButton = this.add.image(100, 230, 'backbutton')
            .setOrigin(0.5)
            .setScale(0.7);
            this.addButtonEffects(backButton);
            backButton.on('pointerdown', () => {

                title.destroy();
                previewImage.destroy();
                subtitle.destroy();
                backButton.destroy();
                nextButton.destroy();
                difficultyRate.destroy();
                difficultyText.destroy();
                this.showLevelSelectorPage5();
            });

        const nextButton = this.add.image(this.cameras.main.width - 100, 230, 'exitbutton')
            .setOrigin(0.5)
            .setScale(0.35);
            this.addButtonEffects(nextButton);
            nextButton.on('pointerdown', () => {

                title.destroy();
                previewImage.destroy();
                subtitle.destroy();
                backButton.destroy();
                nextButton.destroy();
                difficultyRate.destroy();
                difficultyText.destroy();
                this.create();
            });
    }

    showInfo(title, playButton, optionsButton, creditsButton) {

        if (title) title.destroy();
        if (playButton) playButton.destroy();
        if (optionsButton) optionsButton.destroy();
        if (creditsButton && creditsButton.destroy) {creditsButton.destroy();}
        if (this.subtext) this.subtext.destroy();

        const backButton = this.add.image(100, 230, 'exitbutton')
            .setOrigin(0.5)
            .setScale(0.35);
        this.addButtonEffects(backButton);
        backButton.on('pointerdown', () => {
            if (backButton) backButton.destroy();
            if (tutorialButton) tutorialButton.destroy();
            if (creditsButton2) creditsButton2.destroy();
            this.create();
        });

        const tutorialButton = this.add.image(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 80, 
            'tutorialbutton'
        )
        .setOrigin(0.5)
        .setScale(0.25);
        this.addButtonEffects(tutorialButton);

        tutorialButton.on('pointerdown', () => {
            if (backButton) backButton.destroy();
            if (tutorialButton) tutorialButton.destroy();
            if (creditsButton2) creditsButton2.destroy();
            this.tutorialLanguageSelector();
        });

        const creditsButton2 = this.add.image(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 80, 
            'creditsbutton2'
        )
        .setOrigin(0.5)
        .setScale(0.25);
        this.addButtonEffects(creditsButton2);
    }

    tutorialLanguageSelector() {
        const backButton = this.add.image(100, 230, 'backbutton')
            .setOrigin(0.5)
            .setScale(0.7);
        this.addButtonEffects(backButton);
        backButton.on('pointerdown', () => {
            if (backButton) backButton.destroy();
            if (titleText) titleText.destroy();
            if (englishButton) englishButton.destroy();
            if (urduButton) urduButton.destroy();
            this.showInfo();
        });

        const titleText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 130, 
            'Select a Language', 
            { fontSize: '32px', fill: '#ffffff', fontFamily: 'Comic Sans MS, sans-serif'}
        ).setOrigin(0.5);

        const englishButton = this.add.image(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 20, 
            'englishbutton'
        )
        .setOrigin(0.5)
        .setScale(0.2);
        this.addButtonEffects(englishButton);
        englishButton.on('pointerdown', () => {
            if (backButton) backButton.destroy();
            if (titleText) titleText.destroy();
            if (englishButton) englishButton.destroy();
            if (urduButton) urduButton.destroy();
            this.showEnglishTutorial();
        });

        const urduButton = this.add.image(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 100, 
            'urdubutton'
        )
        .setOrigin(0.5)
        .setScale(0.2);
        this.addButtonEffects(urduButton);
        urduButton.on('pointerdown', () => {
            if (backButton) backButton.destroy();
            if (titleText) titleText.destroy();
            if (englishButton) englishButton.destroy();
            if (urduButton) urduButton.destroy();
            this.showUrduTutorial();
        });
    }
    
    showEnglishTutorial() {
        this.showeTutorialPage1();
    }

    showeTutorialPage1() {
        const title = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 190, 
            'Movement', 
            { fontSize: '36px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif'}
        ).setOrigin(0.5);

        const description = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 130, 
             'Notes will fall down to the platform\nwhich is divided into four lanes.',
                 { fontSize: '18px', fill: '#FFF',fontFamily: 'Comic Sans MS', align: 'center', wordWrap: { width: 400 } }
        ).setOrigin(0.5);

        const description2 = this.add.text(
            this.cameras.main.centerX - 170, 
            this.cameras.main.centerY + 50, 
             'Tap the platform segment\n to move the\n Player Tile between lanes.\n\nUse A S D F\n keys to move\nif you are playing\n on PC.', 
                 { fontSize: '18px', fill: '#FFF',fontFamily: 'Comic Sans MS', align: 'center', wordWrap: { width: 400 } }
        ).setOrigin(0.5);
        
        const previewImage = this.add.image(
            this.cameras.main.centerX + 120, 
            this.cameras.main.centerY + 80, 
            'englishtutorialimage1'
        ).setOrigin(0.5).setScale(0.3);

        const backButton = this.add.image(100, 70, 'backbutton')
            .setOrigin(0.5)
            .setScale(0.7)
            .setInteractive();
        this.addButtonEffects(backButton);
        backButton.on('pointerdown', () => {
            title.destroy();
            description.destroy();
            description2.destroy();
            previewImage.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.tutorialLanguageSelector();
        });

        const nextButton = this.add.image(this.cameras.main.width - 100, 70, 'nextbutton')
            .setOrigin(0.5)
            .setScale(0.7)
            .setInteractive();
        this.addButtonEffects(nextButton);
        nextButton.on('pointerdown', () => {
            title.destroy();
            description.destroy();
            description2.destroy();
            previewImage.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.showeTutorialPage2();
        });
    }

    showeTutorialPage2() {
        const title = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 190, 
            'Scoring', 
            { fontSize: '32px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif' }
        ).setOrigin(0.5);

        const description = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 35, 
            'You score when a note falls on an highlighted lane. (You dont have to time it perfectly and only need to move once.)\n\nNote!: The Score counts only when\nthe note hits\nthe platform,\nnot the\nhighlighter.', 
            { fontSize: '20px', fill: '#FFF', fontFamily: 'Comic Sans MS',  align: 'center', wordWrap: { width: 400 }}
        ).setOrigin(0.5);

        const image1 = this.add.image(
            this.cameras.main.centerX - 190, 
            this.cameras.main.centerY + 105, 
            'englishtutorialimage2'
        ).setOrigin(0.5).setScale(0.2);

        const image2 = this.add.image(
            this.cameras.main.centerX + 190, 
            this.cameras.main.centerY + 105, 
            'englishtutorialimage3'
        ).setOrigin(0.5).setScale(0.2);

        const backButton = this.add.image(100, 50, 'backbutton')
            .setOrigin(0.5)
            .setScale(0.7)
            .setInteractive();
        this.addButtonEffects(backButton);
        backButton.on('pointerdown', () => {
            title.destroy();
            description.destroy();
            image1.destroy();
            image2.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.showeTutorialPage1();
        });

        const nextButton = this.add.image(this.cameras.main.width - 100, 50, 'nextbutton')
            .setOrigin(0.5)
            .setScale(0.7)
            .setInteractive();
        this.addButtonEffects(nextButton);
        nextButton.on('pointerdown', () => {
            title.destroy();
            description.destroy();
            image1.destroy();
            image2.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.showeTutorialPage3();
        });
    }

    showeTutorialPage3() {
        const title = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 170, 
            'Gameplay', 
            { fontSize: '32px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif' }
        ).setOrigin(0.5);

        const previewImage2 = this.add.image(
            this.cameras.main.centerX + 10, 
            this.cameras.main.centerY - 50, 
            'englishtutorialimage4'
        ).setOrigin(0.5).setScale(0.3);
        
        const description1 = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 95, 
            'Under the platform there is a RythmBar. When you miss a note or if you make an invalid move, it gets smaller.\nOngoing level fails when your Rythmbar runs out. You can restore your Rythmbar by scoring more points!\n\n Notes will keep spawning until the song plays and when finished you will get a ranked result!', 
            { fontSize: '20px', fill: '#FFF', fontFamily: 'Comic Sans MS',  align: 'center', wordWrap: { width: 400 }}
        ).setOrigin(0.5);

        const nextButton = this.add.image(this.cameras.main.width - 100, 70, 'exitbutton')
            .setOrigin(0.5)
            .setScale(0.34)
            .setInteractive();
        this.addButtonEffects(nextButton);
        nextButton.on('pointerdown', () => {
            title.destroy();
            previewImage2.destroy();
            description1.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.create();
        });
        
        const backButton = this.add.image(100, 70, 'backbutton')
            .setOrigin(0.5)
            .setScale(0.7)
            .setInteractive();
        this.addButtonEffects(backButton);
        backButton.on('pointerdown', () => {
            title.destroy();
            previewImage2.destroy();
            description1.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.showeTutorialPage2();
        });
    }

    showUrduTutorial() {
        this.showuTutorialPage1();
    }

    showuTutorialPage1() {
        const title = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 190, 
            'Movement', 
            { fontSize: '36px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif'}
        ).setOrigin(0.5);

        const description = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 130, 
             'Notes neeche ayein ge\nplatform ki 4 lanes hein.',
                 { fontSize: '18px', fill: '#FFF',fontFamily: 'Comic Sans MS', align: 'center', wordWrap: { width: 400 } }
        ).setOrigin(0.5);

        const description2 = this.add.text(
            this.cameras.main.centerX - 170, 
            this.cameras.main.centerY + 50, 
             'Mobile pe platform segment\n ko sirf tap krna he\n us se highlighter us lane\n mein chala jaye ga.\n\nAgr PC pe ho to\n A S D F\n keys use kro movement\n ke liye.', 
                 { fontSize: '18px', fill: '#FFF',fontFamily: 'Comic Sans MS', align: 'center', wordWrap: { width: 400 } }
        ).setOrigin(0.5);

        const previewImage = this.add.image(
            this.cameras.main.centerX + 120, 
            this.cameras.main.centerY + 80, 
            'englishtutorialimage1'
        ).setOrigin(0.5).setScale(0.3);

        const backButton = this.add.image(100, 70, 'backbutton')
            .setOrigin(0.5)
            .setScale(0.7)
            .setInteractive();
        this.addButtonEffects(backButton);
        backButton.on('pointerdown', () => {
            title.destroy();
            description.destroy();
            description2.destroy();
            previewImage.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.tutorialLanguageSelector();
        });

        const nextButton = this.add.image(this.cameras.main.width - 100, 70, 'nextbutton')
            .setOrigin(0.5)
            .setScale(0.7)
            .setInteractive();
        this.addButtonEffects(nextButton);
        nextButton.on('pointerdown', () => {
            title.destroy();
            description.destroy();
            description2.destroy();
            previewImage.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.showuTutorialPage2();
        });
    }

    showuTutorialPage2() {
        const title = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 190, 
            'Scoring', 
            { fontSize: '32px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif' }
        ).setOrigin(0.5);

        const description = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 15, 
            'Jb Highlighter \n(choti purple bar)\n us lane ke upr ho gi\n jis pe note gira, to tumhara score increase ho ga.\n\nNote!:\n Score sirf\n platform ko\nhit kr ke hi\ncount hota he.', 
            { fontSize: '20px', fill: '#FFF', fontFamily: 'Comic Sans MS',  align: 'center', wordWrap: { width: 400 }}
        ).setOrigin(0.5);

        const image1 = this.add.image(
            this.cameras.main.centerX - 190, 
            this.cameras.main.centerY + 105, 
            'urdututorialimage2'
        ).setOrigin(0.5).setScale(0.2);

        const image2 = this.add.image(
            this.cameras.main.centerX + 190, 
            this.cameras.main.centerY + 105, 
            'urdututorialimage1'
        ).setOrigin(0.5).setScale(0.2);

        const backButton = this.add.image(100, 50, 'backbutton')
            .setOrigin(0.5)
            .setScale(0.7)
            .setInteractive();
        this.addButtonEffects(backButton);
        backButton.on('pointerdown', () => {
            title.destroy();
            description.destroy();
            image1.destroy();
            image2.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.showuTutorialPage1();
        });

        const nextButton = this.add.image(this.cameras.main.width - 100, 50, 'nextbutton')
            .setOrigin(0.5)
            .setScale(0.7)
            .setInteractive();
        this.addButtonEffects(nextButton);
        nextButton.on('pointerdown', () => {
            title.destroy();
            description.destroy();
            image1.destroy();
            image2.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.showuTutorialPage3();
        });
    }

    showuTutorialPage3() {
        const title = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 200, 
            'Gameplay', 
            { fontSize: '32px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif' }
        ).setOrigin(0.5);

        const previewImage2 = this.add.image(
            this.cameras.main.centerX + 10, 
            this.cameras.main.centerY - 100, 
            'englishtutorialimage4'
        ).setOrigin(0.5).setScale(0.3);

        const description1 = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 95, 
            'Lanes de thalle RythmBar he.\n Jab bhi galat lane pe move ya note miss kro ge to usse minus pre ga.\nBar khatam hone pe game over ho jati. Points score kr ke RythmBar ko recover kr sakte ho.\n Notes gane ke saath synced hein (bari mehnat wala kaam he) jb gana complete ho ga to notes ana band ho jain ge te level poora ho jaye ga.', 
            { fontSize: '20px', fill: '#FFF', fontFamily: 'Comic Sans MS',  align: 'center', wordWrap: { width: 400 }}
        ).setOrigin(0.5);

        const nextButton = this.add.image(this.cameras.main.width - 100, 70, 'exitbutton')
            .setOrigin(0.5)
            .setScale(0.34)
            .setInteractive();
        this.addButtonEffects(nextButton);
        nextButton.on('pointerdown', () => {
            title.destroy();
            previewImage2.destroy();
            description1.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.create();
        });

        const backButton = this.add.image(100, 70, 'backbutton')
            .setOrigin(0.5)
            .setScale(0.7)
            .setInteractive();
        this.addButtonEffects(backButton);
        backButton.on('pointerdown', () => {
            title.destroy();
            previewImage2.destroy();
            description1.destroy();
            backButton.destroy();
            nextButton.destroy();
            this.showuTutorialPage2();
        });
    }
    
    showoptions(title, playButton, optionsButton, creditsButton) {

        if (title) title.destroy();
        if (playButton) playButton.destroy();
        if (optionsButton) optionsButton.destroy();
        if (creditsButton) creditsButton.destroy();
        if (this.subtext) this.subtext.destroy();


        const soundVolumeButton = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 120, 
            'Sound Volume', 
            { fontSize: '28px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif'}
        )
        .setOrigin(0.5)
        .setInteractive();

        let gamevolume = 1;
        let barWidth = 200;
        let barHeight = 10;
        let sphereRadius = 10;
        let lastDragX = 0;
        let lastDragTime = 0;
        let speedThreshold = 2;
        let isSphereOutOfBounds = false;

        let soundBar = this.add.graphics();
        soundBar.fillStyle(0xFFFFFF, 1);
        soundBar.fillRect(this.cameras.main.centerX - barWidth / 2, this.cameras.main.centerY - 60, barWidth, barHeight);

        let sphere = this.add.circle(this.cameras.main.centerX, this.cameras.main.centerY - 60 + barHeight / 2, sphereRadius, 0xFFD700).setInteractive();
        this.input.setDraggable(sphere);

        let volumeText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, `Volume: ${gamevolume * 100}%`, { fontSize: '24px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif'}).setOrigin(0.5);

        let dragHistory = [];
        let maxDragHistoryLength = 2;
        let directionChanges = 0;
        let isSphereBeingDragged = false;

        //bug here.
        sphere.on('dragstart', (pointer, gameObject) => {
            lastDragX = gameObject.x;
            lastDragTime = this.time.now;
            isSphereOutOfBounds = false;
            isSphereBeingDragged = true; 
            dragHistory = [];
            directionChanges = 0; 
        });

        sphere.on('drag', (pointer, dragX, dragY) => {
            let currentTime = this.time.now;
            let deltaTime = currentTime - lastDragTime;
            let deltaX = dragX - lastDragX;
            let dragSpeed = Math.abs(deltaX) / (deltaTime || 1);

            if (isSphereOutOfBounds) {
                sphere.x += deltaX;
                gamevolume = (sphere.x - (this.cameras.main.centerX - barWidth / 2)) / barWidth;
                this.registry.set('gamevolume', gamevolume);
                volumeText.setText(`Volume: ${Math.round(gamevolume * 100)}%`);
            } else {
                dragX = Phaser.Math.Clamp(dragX, this.cameras.main.centerX - barWidth / 2, this.cameras.main.centerX + barWidth / 2);
                sphere.x = dragX;
                gamevolume = (dragX - (this.cameras.main.centerX - barWidth / 2)) / barWidth;
                this.registry.set('gamevolume', gamevolume);
                volumeText.setText(`Volume: ${Math.round(gamevolume * 100)}%`);
            }

            dragHistory.push(dragX);
            if (dragHistory.length > maxDragHistoryLength) {
                dragHistory.shift();
            }

            if (dragHistory.length > 0) {
                let previousX = dragHistory[dragHistory.length - 1];
                if ((previousX < this.cameras.main.centerX && dragX > this.cameras.main.centerX) ||
                    (previousX > this.cameras.main.centerX && dragX < this.cameras.main.centerX)) {
                    directionChanges++;
                }
            }

            if (directionChanges >= 2 && dragSpeed > speedThreshold) {
                isSphereOutOfBounds = true;
                let direction = deltaX > 0 ? 1 : -1;
                let popOutX = sphere.x + direction * 50;
                popOutX = Phaser.Math.Clamp(popOutX, this.cameras.main.centerX - barWidth / 2, this.cameras.main.centerX + barWidth / 2);

                this.tweens.add({
                    targets: sphere,
                    x: popOutX,
                    y: sphere.y + 50,
                    duration: 300,
                    ease: 'Power2'
                });
            }

            lastDragX = dragX;
            lastDragTime = currentTime;
        });

        sphere.on('dragend', () => {
            isSphereBeingDragged = false;

            if (isSphereOutOfBounds) {
                this.tweens.add({
                    targets: sphere,
                    x: Phaser.Math.Clamp(sphere.x, this.cameras.main.centerX - barWidth / 2, this.cameras.main.centerX + barWidth / 2),
                    y: this.cameras.main.centerY - 60 + barHeight / 2,
                    duration: 500,
                    ease: 'Power2',
                    onComplete: () => {
                        isSphereOutOfBounds = false;
                    }
                });
            } else {
                this.tweens.add({
                    targets: sphere,
                    x: Phaser.Math.Clamp(sphere.x, this.cameras.main.centerX - barWidth / 2, this.cameras.main.centerX + barWidth / 2),
                    y: this.cameras.main.centerY - 60 + barHeight / 2,
                    duration: 300,
                    ease: 'Power2'
                });
            }
        });
        
        const backButton = this.add.image(100, 230, 'backbutton')
        .setOrigin(0.5)
        .setScale(0.7);
        this.addButtonEffects(backButton);
        backButton.on('pointerdown', () => {
            
            if (this.optionsTitle) this.optionsTitle.destroy();
            if (soundVolumeButton) soundVolumeButton.destroy();
            if (backButton) backButton.destroy();
            if (soundBar) soundBar.destroy();
            if (sphere) sphere.destroy();
            if (volumeText) volumeText.destroy();
            
            this.create();
        });
    }

        addButtonEffects(image) {
            image.setInteractive({ useHandCursor: true });

            image.on('pointerover', () => {
                image.setScale(image.scaleX * 1.05);
                image.setTint(0xDDDDDD);
            });

            image.on('pointerout', () => {
                image.setScale(image.scaleX / 1.05);
                image.clearTint();
            });

            image.on('pointerdown', () => {
                image.setScale(image.scaleX * 0.95);
            });

            image.on('pointerup', () => {
                image.setScale(image.scaleX / 0.95);
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
        this.laneColors = [0x00b8ff, 0x32cd32, 0x00719c, 0x5500FF];
        this.isPaused = false;
        this.pauseMenu = null;
        this.music = null;
        this.musicStarted = false;
    }


    preload() {

        let width = this.cameras.main.width;
        let height = this.cameras.main.height;

        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0xffffff, 0.2);
        progressBox.fillRect(width / 4 - 10, height / 2 - 25, width / 2 + 20, 50);

        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x00b8ff, 1);
            progressBar.fillRect(width / 4, height / 2 - 15, (width / 2) * value, 30);
        });
        
        this.load.audio('SRANKSOUND', 'Sranksound.mp3');
        this.load.audio('ARANKSOUND', 'Aranksound.mp3');
        this.load.audio('gamemusic', 'Level1-track.mp3');
        this.load.audio('LevelFailed', 'LEVELFAILED.mp3');
        this.load.image('characterImage1', 'usagi1.png');
        this.load.image('characterImage2', 'usagi2.png');
        this.load.image('characterImage3', 'usagi3.png');
        this.load.image('characterImage4', 'usagi4.png');
        this.load.image('pausebutton', 'pausebutton.png');
        this.load.image('exitbutton', 'exitbutton.png');
        this.load.image('unpausebutton', 'unpausebutton.png');

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });
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

        let playerGraphics = this.add.rectangle(
            partWidth / 2, 
            platformY - 25, 
            partWidth, 
            5, 
            0x8206FF
        );

        playerGraphics.setStrokeStyle(2, 0x800080); 

        this.matter.world.on('beforeupdate', () => {
            playerGraphics.x = this.player.position.x;
            playerGraphics.y = this.player.position.y;
        });
        
        this.physics.world.setBounds(0, 0, this.cameras.main.width, this.cameras.main.height);

        let gamevolume = this.registry.get('gamevolume') || 1;

        this.sRankSound = this.sound.add('SRANKSOUND');
        this.aRankSound = this.sound.add('ARANKSOUND');

        this.FAILURESOUND = this.sound.add('LevelFailed');
        
        if (!this.music) {
            this.music = this.sound.add('gamemusic', {volume: gamevolume});
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

        this.scoreText = this.add.text(25, 10, 'Score: ', { fontSize: '24px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif'});
        this.streakText = this.add.text(25, 60, 'Streak: ', { fontSize: '24px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif'});

        this.scoreNumber = this.add.text(120, 8, '0', { fontSize: '28px', fill: '#FFF', fontFamily: 'Comic Sans MS'});
        this.streakNumber = this.add.text(140, 58, '0', { fontSize: '30px', fill: '#FFF', fontFamily: 'Comic Sans MS' });

        
        this.character = this.add.image(this.cameras.main.width - 100, this.cameras.main.height - 200, 'characterImage1').setScale(0.3);

        const pauseButton = this.pauseButton = this.add.image(this.cameras.main.width - 120, 80, 'pausebutton')
            .setScale(0.3);
        this.addButtonEffects(pauseButton);
            pauseButton.on('pointerdown', () => this.pauseGame());

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
          { time: 61 * beatInterval, lane: 0 },
          { time: 61.5 * beatInterval, lane: 1 },
          { time: 62 * beatInterval, lane: 2 },
          { time: 62.5 * beatInterval, lane: 2 },
          { time: 62.7 * beatInterval, lane: 3 },
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
          { time: 160.2 * beatInterval, lane: 1 },
          { time: 160.5 * beatInterval, lane: 3 },
          { time: 161 * beatInterval, lane: 0 },
          { time: 161.2 * beatInterval, lane: 2 },
          { time: 161.5 * beatInterval, lane: 3 },
          { time: 162 * beatInterval, lane: 0 },
          { time: 162.2 * beatInterval, lane: 1 },
          { time: 162.5 * beatInterval, lane: 3 },
          { time: 163 * beatInterval, lane: 0 },
          { time: 163.2 * beatInterval, lane: 2 },
          { time: 163.5 * beatInterval, lane: 3 },
          { time: 164 * beatInterval, lane: 0 },
          { time: 164.2 * beatInterval, lane: 1 },
          { time: 164.5 * beatInterval, lane: 3 },
          { time: 165 * beatInterval, lane: 0 },
          { time: 165.2 * beatInterval, lane: 1 },
          { time: 165.5 * beatInterval, lane: 3 },
          { time: 166 * beatInterval, lane: 0 },
          { time: 166.2 * beatInterval, lane: 2 },
          { time: 166.5 * beatInterval, lane: 3 },
          { time: 167 * beatInterval, lane: 0 },
          { time: 167.2 * beatInterval, lane: 1 },
          { time: 167.5 * beatInterval, lane: 3 },
          { time: 168 * beatInterval, lane: 0 },
          { time: 168.2 * beatInterval, lane: 1 },
          { time: 168.5 * beatInterval, lane: 3 },
          { time: 169 * beatInterval, lane: 0 },
          { time: 169.2 * beatInterval, lane: 2 },
          { time: 169.5 * beatInterval, lane: 3 },
          { time: 170 * beatInterval, lane: 0 },
          { time: 170.2 * beatInterval, lane: 2 },
          { time: 170.5 * beatInterval, lane: 3 },
          { time: 171 * beatInterval, lane: 0 },
          { time: 171.2 * beatInterval, lane: 1 },
          { time: 171.5 * beatInterval, lane: 3 },
          { time: 172 * beatInterval, lane: 3 },
          { time: 172.2 * beatInterval, lane: 1 },
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

        this.blurOverlay = this.add.rectangle(
            this.cameras.main.centerX, 
            this.cameras.main.centerY, 
            this.cameras.main.width, 
            this.cameras.main.height, 
            0x000000, 
            0.5
        ).setOrigin(0.5);

        const levelFailedMenu = this.add.container(this.cameras.main.width / 2, this.cameras.main.height / 2);

            const menuBackground = this.add.rectangle(
                0, 0, 
                400, 350, 
                0x000000, 
                0.8
            ).setOrigin(0.5).setStrokeStyle(4, 0xFFFFFF);

            this.levelFailedText = this.add.text(
                0, 
                -80, 
                'Stage Failed', 
                { fontSize: '48px', fill: '#ff0000', fontFamily: 'Comic Sans MS, sans-serif' }
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
                0, 
                -20, 
                `${randomTip}`, 
                { fontSize: '24px', fill: '#ffffff' }
            ).setOrigin(0.5);

            this.FAILURESOUND.play();
            this.pauseButton.destroy();
        
            this.scoreText = this.add.text(
                0, 
                40, 
                `Score: ${this.score}`, 
                { fontSize: '32px', fill: '#ffffff' }
            ).setOrigin(0.5);

            const backButton = this.backButton = this.add.image(
                0, 
                120, 
                'exitbutton'
            ).setOrigin(0.5)
                .setScale(0.3);
                this.addButtonEffects(backButton);
                backButton.on('pointerdown', () => {
                    this.cleanUpLevelFailed();
                    this.scene.start('TitleScene');
                });

            levelFailedMenu.add([
                menuBackground, 
                this.levelFailedText, 
                this.tipText, 
                this.scoreText, 
                this.backButton
            ]);
            this.children.bringToTop(this.blurOverlay);
            this.children.bringToTop(levelFailedMenu);
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
            this.playerpop();
            this.currentStreak++;
            if (this.currentStreak > this.highestStreak) {
                this.highestStreak = this.currentStreak;
            }
            
            this.updateScoreAndStreak();
            this.increaseRedBar();
            this.noteScored = true;
            this.createLanePop(lane);
            
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

    playerpop() {
        const originalScale = 0.3; 
        const popScale = 0.31;

        this.tweens.add({
            targets: this.character,
            scaleX: popScale,
            scaleY: popScale,
            duration: 100, 
            yoyo: true,     
            ease: 'Power1',
            onComplete: () => {
                this.character.setScale(originalScale);
            }
        });
    }
    
    createLanePop(lane) {
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

    createSparkles(textObject, xposition = 0, yposition = 0, speed = 1000) { 
        const colors = [
            0xFFB3BA, 0xFFDFBA, 0xFFFFBA, 0xBAFFC9, 0xBAE1FF,
            0xF0E68C, 0xE6E6FA, 0xFFFACD, 0xFFDAB9, 0xD8BFD8
        ];

        for (let i = 0; i < 170; i++) {
            let x = textObject.x + xposition + Phaser.Math.Between(-150, 150);
            let y = textObject.y + yposition + Phaser.Math.Between(-15, 15);

            let sparkle = this.add.graphics();
            let randomColor = Phaser.Utils.Array.GetRandom(colors);
            sparkle.fillStyle(randomColor, 1);
            sparkle.fillCircle(0, 0, 2);

            sparkle.setPosition(x, y);

            let targetX = x + Phaser.Math.Between(50, 450);
            let targetY = y; 

            this.add.existing(sparkle);

            this.tweens.add({
                targets: sparkle,
                x: targetX,
                y: targetY,
                alpha: { from: 1, to: 0 },
                duration: speed,
                ease: 'Power3',
                onComplete: () => {
                    sparkle.destroy();
                }
            });
        }
    }

    createStarPop(textObject, xposition = 0, yposition = 0, duration = 1000, starCount = 5) {

        const pastelColors = [
            0xFFB3BA, 0xFFDFBA, 0xFFFFBA, 0xBAFFC9, 0xBAE1FF,
            0xF0E68C, 0xE6E6FA, 0xFFFACD, 0xFFDAB9, 0xD8BFD8
        ];

        for (let i = 0; i < starCount; i++) {
            let star = this.add.graphics();
            let randomColor = Phaser.Utils.Array.GetRandom(pastelColors);
            let randomScale = Phaser.Math.FloatBetween(0.2, 1);

            let starPath = this.getStarPath(0, 0, 5, 20 * randomScale, 40 * randomScale);
            star.fillStyle(randomColor, 1);
            star.beginPath();
            star.moveTo(starPath[0].x, starPath[0].y);

            for (let j = 1; j < starPath.length; j++) {
                star.lineTo(starPath[j].x, starPath[j].y);
            }

            star.closePath();
            star.fillPath();
            
            let randomX = Phaser.Math.Between(-600, 600);
            let randomY = Phaser.Math.Between(-400, 400);
            star.setPosition(textObject.x + xposition + randomX, textObject.y + yposition + randomY);

            star.setScale(randomScale);
            star.setAlpha(1);

            this.tweens.add({
                targets: star,
                scaleX: randomScale * 2,
                scaleY: randomScale * 2,
                alpha: 0,
                duration: duration,
                delay: i * 100,
                ease: 'Power3',
                onComplete: () => {
                    star.destroy();
                }
            });
        }
    }
    
    getStarPath(cx, cy, spikes, outerRadius, innerRadius) {
        let path = [];
        let rot = Math.PI / 2 * 3;
        let step = Math.PI / spikes;

        for (let i = 0; i < spikes; i++) {
            let x = cx + Math.cos(rot) * outerRadius;
            let y = cy + Math.sin(rot) * outerRadius;
            path.push({ x, y });

            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            path.push({ x, y });

            rot += step;
        }

        return path;
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
                fontFamily: 'Courier New',
            }
        ).setOrigin(0.5);

        this.tweens.add({
            targets: missText,
            y: platformY - 100,
            alpha: 0,
            duration: 1000,
            ease: 'Power1',
            onComplete: () => {
                missText.destroy();
            }
        });
    }
    
    updateScoreAndStreak() {
        this.scoreNumber.setText(this.score);
        const colors = [
            0xFFB3BA, 0xFFDFBA, 0xFFFFBA, 0xBAFFC9, 0xBAE1FF,
            0xF0E68C, 0xE6E6FA, 0xFFFACD, 0xFFDAB9, 0xD8BFD8 ];
  
        let randomColor = Phaser.Utils.Array.GetRandom(colors);
        let randomColorHex = `#${randomColor.toString(16).padStart(6, '0')}`
        this.streakNumber.setText(this.currentStreak);

        this.createPoptext.call(this, this.scoreNumber);
        this.createPoptext.call(this, this.streakNumber);

        if (this.score >= 155) {
            this.createStarPop(this.character, 0, 0, 1000, 5);
        } else if (this.score >= 100) {
            this.createStarPop(this.character, 0, 0, 1000, 3);
        } else if (this.score >= 50) {
            this.createStarPop(this.character, 0, 0, 1000, 1);
        }

        if (this.currentStreak >= 77) {
            this.streakNumber.setFill(randomColorHex);
            if (this.currentStreak === 77) {
                this.createSparkles.call(this, this.streakNumber, 0, 15, 1000);
            }
        } else if (this.currentStreak >= 47) {
            this.streakNumber.setFill(randomColorHex);
            if (this.currentStreak === 47) {
                this.createSparkles.call(this, this.streakNumber, 0, 15, 1000);
            }
        } else if (this.currentStreak >= 17) {
            this.streakNumber.setFill('#BAE1FF');
            if (this.currentStreak === 17) {
                this.createSparkles.call(this, this.streakNumber, 0, 15, 1000);
            }
        } else if (this.currentStreak >= 7) {
            this.streakNumber.setFill('#FFFFE0');
        } else if (this.currentStreak < 1) {
            this.streakNumber.setFill('#FF0000');
        } else {
            this.streakNumber.setFill('#FFF');
        }
    }
    
    pauseGame() {
        if (this.isPaused) return;

        this.isPaused = true;
        this.physics.world.isPaused = true;
        this.music?.pause();
        this.time.timeScale = 0;
        this.matter.world.pause();

        this.blurOverlay = this.add.rectangle(
            this.cameras.main.centerX, 
            this.cameras.main.centerY, 
            this.cameras.main.width, 
            this.cameras.main.height, 
            0x000000, 
            0.5
        ).setOrigin(0.5); 
        this.pauseMenu = this.add.container(this.cameras.main.width / 2, this.cameras.main.height / 2);

        const menuBackground = this.add.rectangle(0, 0, 300, 400, 0x000000, 0.7)
            .setStrokeStyle(4, 0xFFFFFF)
            .setOrigin(0.5);

        const resumeButton = this.add.image(0, -70, 'unpausebutton')
            .setOrigin(0.5)
            .setScale(0.4);
            this.addButtonEffects(resumeButton);
            resumeButton.on('pointerdown', () => this.resumeGame());

        const backButton = this.add.image(0, 70, 'exitbutton')
            .setOrigin(0.5)
            .setScale(0.4);
            this.addButtonEffects(backButton);
            backButton.on('pointerdown', () => {
                this.music?.stop();
                this.music = null;
                this.scene.stop('LevelScene');
                this.scene.start('TitleScene');
            });

        this.pauseMenu.add([menuBackground, resumeButton, backButton]);
        this.children.bringToTop(this.pauseMenu);
        this.pauseButton.destroy();
    }

    resumeGame() {
        this.isPaused = false;
        this.physics.world.isPaused = false;
        this.time.timeScale = 1;
        this.matter.world.resume();
        this.music?.resume();

        this.blurOverlay.destroy();
        this.pauseMenu.destroy();
        const pauseButton = this.pauseButton = this.add.image(this.cameras.main.width - 120, 80, 'pausebutton') 
        .setScale(0.3);
        this.addButtonEffects(pauseButton);
        pauseButton.on('pointerdown', () => this.pauseGame());
    }

    showLevelClearMenu() {

        this.music.stop();
        this.physics.pause();
        this.isPaused = true;
        this.pauseButton.destroy();
        this.blurOverlay = this.add.rectangle(
            this.cameras.main.centerX, 
            this.cameras.main.centerY, 
            this.cameras.main.width, 
            this.cameras.main.height, 
            0x000000, 
            0.5
        ).setOrigin(0.5);

        const levelClearMenu = this.add.container(this.cameras.main.width / 2, this.cameras.main.height / 2);

        const menuBackground = this.add.rectangle(0, 0, 475, 375, 0x000000, 0.8)
            .setOrigin(0.5)
            .setStrokeStyle(4, 0xFFFFFF);

        const titleText = this.add.text(0, -100, 'Stage Cleared!', { fontSize: '48px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif' }).setOrigin(0.5);

        const rankLabel = this.add.text(0, -40, 'RANK: ', { fontSize: '32px', fill: '#FFF'}).setOrigin(0.5);

        const rankGrade = this.add.text(rankLabel.x + rankLabel.width / 2, -40, this.calculateRank(), { 
            fontSize: '32px', 
            fill: '#FFF', 
            fontFamily: 'Comic Sans MS, sans-serif'
        }).setOrigin(0, 0.5);
        this.updateRankText.call(this, rankGrade);

        const scoreText = this.add.text(0, 10, `SCORE: ${this.score}`, { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);

        const streakText = this.add.text(0, 60, `STREAK: ${this.highestStreak}`, { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);

        const backButton = this.add.image(0, 130, 'exitbutton')
            .setOrigin(0.5)
            .setScale(0.3);
            this.addButtonEffects(backButton);
            backButton.on('pointerdown', () => {
                this.music?.stop();
                this.music = null;
                this.scene.stop('LevelScene');
                this.scene.start('TitleScene');
            });

        levelClearMenu.add([menuBackground, titleText, rankLabel, rankGrade, scoreText, streakText, backButton]);
        this.children.bringToTop(levelClearMenu);
    }

    createPoptext(textObject) {
        this.tweens.add({
            targets: textObject,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 100,
            yoyo: true,
            onComplete: () => {
                textObject.setScale(1);
            }
        });
    }
    
    calculateRank() {
    
        if (this.score >= 250) {
            return 'S';
        } else if (this.score >= 200) {
            return 'A';
        } else if (this.score >= 180) {
            return 'B';
        } else if (this.score >= 155) {
            return 'C';
        } else {
            return 'D';
        }
    }

    updateRankText(rankGrade) {
        const rank = this.calculateRank();

        switch (rank) {
            case 'S':
                rankGrade.setFill('#FFD700');
                this.sRankSound.play();
                break;
            case 'A':
                rankGrade.setFill('#90EE90');
                this.aRankSound.play();
                break;
            case 'B':
                rankGrade.setFill('#ADD8E6');
                break;
            case 'C':
                rankGrade.setFill('#FFA07A');
                break;
            case 'D':
                rankGrade.setFill('#FF6347');
                break;
            default:
                rankGrade.setFill('#FFF');
                break;
        }
    }

    addButtonEffects(image) {
        image.setInteractive({ useHandCursor: true });

        image.on('pointerover', () => {
            image.setScale(image.scaleX * 1.05);
            image.setTint(0xDDDDDD);
        });

        image.on('pointerout', () => {
            image.setScale(image.scaleX / 1.05);
            image.clearTint();
        });

        image.on('pointerdown', () => {
            image.setScale(image.scaleX * 0.95);
        });

        image.on('pointerup', () => {
            image.setScale(image.scaleX / 0.95);
        });
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