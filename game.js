function adjustViewport() {
  const vh = window.innerHeight * 0.01;
  const vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty('--vw', `${vw}px`);
}

window.addEventListener('resize', () => {
  setTimeout(adjustViewport, 300);
});

window.addEventListener('orientationchange', () => {
  setTimeout(adjustViewport, 300);
});

window.addEventListener('load', adjustViewport);

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
                font: '24px Comic Sans MS',
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
        this.load.image('counting', 'Level3-cover.jpg');
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
        
        const epicgamermotivationalsubtitlelistthing = [
            'waow grape game!',
            'moosic gaem',
            'nihon banzai!!',
            'INDEV',
            'BARISH KYUN NAI A RHI',
            'bruh september mein 40*C',
            'mujhe bhi javascript ati he \n(cool emoji)',
            'barish ata he to pani ata he',
            '2 null pointers!',
            '4 NULL POINTERS!?',
            'bit bugged',
            'MINECRAFT TEXT',
            'version 0.4!!!',
            'tahaaaaaaaaaaaa',
            'a null pointer!',
            'dont talk to D ranks',
            'tunaovertime!!',
            'stobery',
            'CHATGPT HELP ME',
            'play when??',
            'better then before!',
            'rythm gaem'
        ];

        const randomSubtext = Phaser.Utils.Array.GetRandom(epicgamermotivationalsubtitlelistthing);

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

        const maxWidth = this.cameras.main.width - 40;
        while (this.subtext.width > maxWidth) {
            let currentFontSize = parseInt(this.subtext.style.fontSize);
            this.subtext.setFontSize(currentFontSize - 1);
        }
        
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

        const difficultyRate = this.add.text(this.cameras.main.centerX + 70, 330, ' Easy', { fontSize: '28px', fill: '#90EE90', fontFamily: 'Comic Sans MS'}).setOrigin(0.5);

        const previewImage = this.add.image(this.cameras.main.centerX, 160, 'counting').setOrigin(0.5).setScale(0.7);

        const subtitle = this.add.text(this.cameras.main.centerX, 280, 'Counting!', { fontSize: '28px', fill: '#FFF', fontfamily: 'Comic Sans MS'}).setOrigin(0.5);

        playButton = this.add.image(this.cameras.main.centerX, 390, 'playbutton')
            .setOrigin(0.5)
            .setScale(0.25);
            this.addButtonEffects(playButton);
            playButton.on('pointerdown', () => {
                this.startlevel0();
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

        const difficultyRate = this.add.text(this.cameras.main.centerX + 70, 330, ' Easy', { fontSize: '28px', fill: '#90EE90', fontFamily: 'Comic Sans MS'}).setOrigin(0.5);

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

        const difficultyRate = this.add.text(this.cameras.main.centerX + 70, 330, ' Easy', { fontSize: '28px', fill: '#90EE90', fontFamily: 'Comic Sans MS'}).setOrigin(0.5);

        const previewImage = this.add.image(this.cameras.main.centerX, 160, 'usagiflap').setOrigin(0.5).setScale(0.3);

        const playButton = this.add.image(this.cameras.main.centerX, 390, 'playbutton')
        .setOrigin(0.5)
        .setScale(0.25);
        this.addButtonEffects(playButton);
        playButton.on('pointerdown', () => {
            this.startlevel1();
        });
        
        const subtitle = this.add.text(this.cameras.main.centerX, 280, 'Usagiflap', { fontSize: '28px', fill: '#FFF', fontfamily: 'Comic Sans MS'}).setOrigin(0.5);


        const backButton = this.add.image(100, 230, 'backbutton')
            .setOrigin(0.5)
            .setScale(0.7);
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
                playButton.destroy();
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

        const playButton = this.add.image(this.cameras.main.centerX, 390, 'playbutton')
        .setOrigin(0.5)
        .setScale(0.25);
        this.addButtonEffects(playButton);
        playButton.on('pointerdown', () => {
            this.startlevel4();
        });

        const backButton = this.add.image(100, 230, 'backbutton')
            .setOrigin(0.5)           
            .setScale(0.7);
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
                playButton.destroy();
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

        const playButton = this.add.image(this.cameras.main.centerX, 390, 'playbutton')
        .setOrigin(0.5)
        .setScale(0.25);
        this.addButtonEffects(playButton);
        playButton.on('pointerdown', () => {
            this.startlevel5();
        });
        
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
                playButton.destroy();
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
                playButton.destroy();
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
    
            startlevel1() {
                this.scene.start('Usagiflap');
            }
            startlevel4() {
                this.scene.start('Planetloop');
            }
            startlevel0() {
                this.scene.start('Counting');
            }
            startlevel5() {
                this.scene.start('FinalBoss');
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

        if (this.platformGraphics) {
                this.platformGraphics.destroy();
            }
        
            this.platforms.forEach(platform => {
                if (platform) {
                    this.matter.world.remove(platform);
                }
            });
        
            if (this.playerGraphics) {
                this.playerGraphics.destroy();
            }

            if (this.player) {
                this.matter.world.remove(this.player);
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
            y: this.player.position.y,
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
        const playerY = this.player.position.y;
        const playerLane = Math.floor(playerX / partWidth);

        if (playerLane === lane && note.y >= playerY) {
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

    createStarPop(textobject, xposition = 0, yposition = 0, duration = 1000, starCount = 5) {

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

            let randomX = Phaser.Math.Between(-400, 400);
            let randomY = Phaser.Math.Between(50, 150);
            star.setPosition(this.cameras.main.centerX + xposition + randomX, this.cameras.main.centerY + yposition + randomY);

            star.setScale(randomScale);
            star.setAlpha(1);

            let randomUpwardSpeed = Phaser.Math.FloatBetween(50, 100);
            let randomRotationSpeed = Phaser.Math.FloatBetween(0.01, 0.05);

            this.tweens.add({
                targets: star,
                y: star.y - randomUpwardSpeed,
                alpha: 0, 
                angle: star.angle + Phaser.Math.Between(10, 360),
                duration: duration,
                ease: 'Power3',
                onComplete: () => {
                    star.destroy();
                }
            });

            this.tweens.add({
                targets: star,
                angle: star.angle + Phaser.Math.Between(10, 360),
                duration: duration,
                ease: 'Linear',
                repeat: -1
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
            const partWidth = platformWidth / 4;;
            const platformY = this.cameras.main.height - 100;
            const platformX = partWidth * lane;
            const redShades = ['#8B0000', '#A52A2A', '#B22222', '#FF0000', '#FF4D4D', '#FF9999'];

            const missText = this.add.text(
                platformX + partWidth / 2,
                platformY - 50,
                'MISS', 
                {
                    fontSize: '32px', 
                    fill: Phaser.Utils.Array.GetRandom(redShades), 
                    fontFamily: 'Courier New',
                    fontStyle: 'bold'
                }
            ).setOrigin(0.5);

            const colorTween = this.time.addEvent({
                delay: 100, 
                callback: () => {
                    missText.setColor(Phaser.Utils.Array.GetRandom(redShades));
                },
                loop: true
            });

            this.tweens.add({
                targets: missText,
                y: platformY - 100,
                alpha: 0,
                duration: 1000,
                ease: 'Power1',
                onComplete: () => {
                    colorTween.remove();
                    missText.destroy();
                }
            });

            const platformRect = this.add.rectangle(platformX + partWidth / 2, platformY, partWidth, 15, Phaser.Utils.Array.GetRandom(redShades))
                    .setOrigin(0.5)
                    .setAlpha(0);
        
            const colorTweenRect = this.time.addEvent({
                    delay: 50,
                    callback: () => {
                    const randomColor = Phaser.Display.Color.HexStringToColor(Phaser.Utils.Array.GetRandom(redShades)).color;
                    platformRect.setFillStyle(randomColor);
                    },
                    loop: true
                });

                this.tweens.add({
                    targets: platformRect,
                    alpha: 0.9,
                    duration: 300,
                    yoyo: true,
                    onComplete: () => {
                        colorTweenRect.remove();
                        platformRect.destroy();
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
        this.platforms.forEach(platform => {
            if (platform) {
                this.matter.world.remove(platform);
            }
        });

        if (this.player) {
            this.matter.world.remove(this.player);
        }
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
            if (document.hidden) {
                if (this.music && this.music.isPlaying && this.musicStarted && !this.isPaused) {
                    this.pauseGame();
                }
            }
        
        if (this.isPaused) return;
    }
}

class Counting extends Phaser.Scene {
    constructor() {
        super({
            key: 'Counting',
            physics: {
                default: 'matter',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            }
        });
        this.laneColors = [
                0x8B0000,
                0xFFD700,
                0x4682B4,
                0x006400 
            ];
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
        this.load.audio('game0music', 'Level0-track.mp3');
        this.load.audio('LevelFailed', 'LEVELFAILED.mp3');
        this.load.image('character2Image1', 'kazuma1.png');
        this.load.image('character2Image2', 'kazuma2.png');
        this.load.image('character2Image3', 'kazuma3.png');
        this.load.image('character2Image4', 'kazuma4.png');
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
        this.backgroundUpdateNeeded = false;
        
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
            this.music = this.sound.add('game0music', {volume: gamevolume});
        }

        this.input.keyboard.on('keydown-A', () => {
            this.handlePlayerMove(0, 'character2Image1');
        });
        this.input.keyboard.on('keydown-S', () => {
            this.handlePlayerMove(1, 'character2Image3');
        });
        this.input.keyboard.on('keydown-D', () => {
            this.handlePlayerMove(2, 'character2Image2');
        });
        this.input.keyboard.on('keydown-F', () => {
            this.handlePlayerMove(3, 'character2Image4');
        });

        this.input.on('pointerdown', (pointer) => {
            const partWidth = this.cameras.main.width / 1.5 / 4;
            const section = Math.floor(pointer.x / partWidth);

            switch (section) {
                case 0:
                    this.handlePlayerMove(0, 'character2Image1');
                    break;
                case 1:
                    this.handlePlayerMove(1, 'character2Image3');
                    break;
                case 2:
                    this.handlePlayerMove(2, 'character2Image2');
                    break;
                case 3:
                    this.handlePlayerMove(3, 'character2Image4');
                    break;
                default:
                    break;
            }
        });

        this.score = 0;
        this.noteCount = 0;
        this.bchangeflag = false;
        this.moveMade = false;

        this.scoreText = this.add.text(25, 10, 'Score: ', { fontSize: '24px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif'});
        this.streakText = this.add.text(25, 60, 'Streak: ', { fontSize: '24px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif'});

        this.scoreNumber = this.add.text(120, 8, '0', { fontSize: '28px', fill: '#FFF', fontFamily: 'Comic Sans MS'});
        this.streakNumber = this.add.text(140, 58, '0', { fontSize: '30px', fill: '#FFF', fontFamily: 'Comic Sans MS' });


        this.character = this.add.image(this.cameras.main.width - 100, this.cameras.main.height - 200, 'character2Image1').setScale(0.3);

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

        const beatInterval = 512.82;

        this.beatmap = [
          { time: 0 * beatInterval, lane: 3 },
          { time: 1 * beatInterval, lane: 2 },
          { time: 2 * beatInterval, lane: 1 },
          { time: 3 * beatInterval, lane: 3 },
          { time: 4 * beatInterval, lane: 3 },
          { time: 5 * beatInterval, lane: 0 },
          { time: 6 * beatInterval, lane: 1 },
          { time: 7 * beatInterval, lane: 2 },
          { time: 8 * beatInterval, lane: 2 },
          { time: 9 * beatInterval, lane: 0 },
          { time: 10 * beatInterval, lane: 3 },
          { time: 11 * beatInterval, lane: 2 },
          { time: 12 * beatInterval, lane: 1 },
          { time: 13 * beatInterval, lane: 0 },
          { time: 14 * beatInterval, lane: 3 },
          { time: 15 * beatInterval, lane: 2 },
          { time: 17 * beatInterval, lane: 0 },
          { time: 18 * beatInterval, lane: 1 },,
          { time: 19 * beatInterval, lane: 1 },
          { time: 20 * beatInterval, lane: 0 },
          { time: 21 * beatInterval, lane: 2 },
          { time: 22 * beatInterval, lane: 3 },
          { time: 23 * beatInterval, lane: 2 },
          { time: 24 * beatInterval, lane: 3 },
          { time: 25 * beatInterval, lane: 1 },
          { time: 26 * beatInterval, lane: 0 },
          { time: 27 * beatInterval, lane: 1 },
          { time: 28 * beatInterval, lane: 0 },
          { time: 29 * beatInterval, lane: 2 },
          { time: 30 * beatInterval, lane: 0 },
          { time: 31 * beatInterval, lane: 0 },
          { time: 32 * beatInterval, lane: 1 },
          { time: 33 * beatInterval, lane: 2 },
          { time: 34 * beatInterval, lane: 3 },
          { time: 35 * beatInterval, lane: 0 },
          { time: 36 * beatInterval, lane: 1 },
          { time: 37 * beatInterval, lane: 0 },
          { time: 38 * beatInterval, lane: 3 },
          { time: 39 * beatInterval, lane: 3 },
          { time: 40 * beatInterval, lane: 0 },
          { time: 41 * beatInterval, lane: 0 },
          { time: 42 * beatInterval, lane: 3 },
          { time: 43 * beatInterval, lane: 1 },
          { time: 44 * beatInterval, lane: 0 },
          { time: 45 * beatInterval, lane: 1 },
          { time: 46 * beatInterval, lane: 0 },
          { time: 47 * beatInterval, lane: 1 },
          { time: 48 * beatInterval, lane: 1 },
          { time: 49 * beatInterval, lane: 3 },
          { time: 50 * beatInterval, lane: 2 },
          { time: 51 * beatInterval, lane: 2 },
          { time: 52 * beatInterval, lane: 0 },
          { time: 53 * beatInterval, lane: 1 },
          { time: 54 * beatInterval, lane: 0 },
          { time: 55 * beatInterval, lane: 2 },
          { time: 56 * beatInterval, lane: 3 },
          { time: 57 * beatInterval, lane: 2 },
          { time: 58 * beatInterval, lane: 1 },
          { time: 59 * beatInterval, lane: 1 },
          { time: 60 * beatInterval, lane: 0 },
          { time: 61 * beatInterval, lane: 1 },
          { time: 62 * beatInterval, lane: 3 },
          { time: 63 * beatInterval, lane: 0 },
          { time: 64 * beatInterval, lane: 1 },
          { time: 65 * beatInterval, lane: 2 },
          { time: 66 * beatInterval, lane: 3 },
          { time: 67 * beatInterval, lane: 0 },
          { time: 68 * beatInterval, lane: 1 },
          { time: 69 * beatInterval, lane: 0 },
          { time: 70 * beatInterval, lane: 3 },
          { time: 71 * beatInterval, lane: 3 },
          { time: 72 * beatInterval, lane: 0 },
          { time: 73 * beatInterval, lane: 0 },
          { time: 74 * beatInterval, lane: 3 },
          { time: 75 * beatInterval, lane: 1 },
          { time: 76 * beatInterval, lane: 0 },
          { time: 77 * beatInterval, lane: 1 },
          { time: 78 * beatInterval, lane: 0 },
          { time: 79 * beatInterval, lane: 1 },
          { time: 80 * beatInterval, lane: 1 },
          { time: 81 * beatInterval, lane: 3 },
          { time: 82 * beatInterval, lane: 2 },
          { time: 83 * beatInterval, lane: 2 },
          { time: 84 * beatInterval, lane: 0 },
          { time: 85 * beatInterval, lane: 1 },
          { time: 86 * beatInterval, lane: 0 },
          { time: 87 * beatInterval, lane: 2 },
          { time: 88 * beatInterval, lane: 3 },
          { time: 89 * beatInterval, lane: 2 },
          { time: 90 * beatInterval, lane: 1 },
          { time: 91 * beatInterval, lane: 1 },
          { time: 92 * beatInterval, lane: 0 },
          { time: 93 * beatInterval, lane: 2 },
          { time: 94 * beatInterval, lane: 1 },
          { time: 95 * beatInterval, lane: 0 },
          { time: 96 * beatInterval, lane: 3 },
          { time: 97 * beatInterval, lane: 3 },
          { time: 98 * beatInterval, lane: 0 },
          { time: 99 * beatInterval, lane: 0 },
          { time: 100 * beatInterval, lane: 3 },
          { time: 101 * beatInterval, lane: 3 },
          { time: 102 * beatInterval, lane: 0 },
          { time: 103 * beatInterval, lane: 0 },
          { time: 104 * beatInterval, lane: 3 },
          { time: 105 * beatInterval, lane: 3 },
          { time: 106 * beatInterval, lane: 1 },
          { time: 107 * beatInterval, lane: 1 },
          { time: 108 * beatInterval, lane: 2 },
          { time: 109 * beatInterval, lane: 2 },
          { time: 110 * beatInterval, lane: 1 },
          { time: 111 * beatInterval, lane: 1 },
          { time: 112 * beatInterval, lane: 2 },
          { time: 113 * beatInterval, lane: 2 },
          { time: 114 * beatInterval, lane: 0 },
          { time: 115 * beatInterval, lane: 0 },
          { time: 116 * beatInterval, lane: 3 },
          { time: 117 * beatInterval, lane: 3 },
          { time: 118 * beatInterval, lane: 0 },
          { time: 119 * beatInterval, lane: 0 },
          { time: 120 * beatInterval, lane: 3 },
          { time: 121 * beatInterval, lane: 3 },
          { time: 122 * beatInterval, lane: 0 },
          { time: 123 * beatInterval, lane: 0 },
          { time: 124 * beatInterval, lane: 3 },
          { time: 125 * beatInterval, lane: 3 },
          { time: 126 * beatInterval, lane: 0 },
          { time: 127 * beatInterval, lane: 0 },
          { time: 128 * beatInterval, lane: 3 },
          { time: 129 * beatInterval, lane: 0 },
          { time: 130 * beatInterval, lane: 1 },
          { time: 131 * beatInterval, lane: 2 },
          { time: 132 * beatInterval, lane: 3 },
          { time: 133 * beatInterval, lane: 0 },
          { time: 134 * beatInterval, lane: 1 },
          { time: 135 * beatInterval, lane: 0 },
          { time: 136 * beatInterval, lane: 3 },
          { time: 137 * beatInterval, lane: 3 },
          { time: 138 * beatInterval, lane: 0 },
          { time: 139 * beatInterval, lane: 0 },
          { time: 140 * beatInterval, lane: 3 },
          { time: 141 * beatInterval, lane: 1 },
          { time: 142 * beatInterval, lane: 0 },
          { time: 143 * beatInterval, lane: 1 },
          { time: 144 * beatInterval, lane: 1 },
          { time: 145 * beatInterval, lane: 3 },
          { time: 146 * beatInterval, lane: 2 },
          { time: 147 * beatInterval, lane: 2 },
          { time: 148 * beatInterval, lane: 0 },
          { time: 149 * beatInterval, lane: 1 },
          { time: 150 * beatInterval, lane: 0 },
          { time: 151 * beatInterval, lane: 2 },
          { time: 152 * beatInterval, lane: 3 },
          { time: 153 * beatInterval, lane: 2 },
          { time: 154 * beatInterval, lane: 1 },
          { time: 155 * beatInterval, lane: 1 },
          { time: 156 * beatInterval, lane: 0 },
          { time: 157 * beatInterval, lane: 1 },
          { time: 158 * beatInterval, lane: 3 },
          { time: 159 * beatInterval, lane: 0 },
          { time: 160 * beatInterval, lane: 1 },
          { time: 161 * beatInterval, lane: 2 },
          { time: 162 * beatInterval, lane: 3 },
          { time: 163 * beatInterval, lane: 0 },
          { time: 164 * beatInterval, lane: 1 },
          { time: 165 * beatInterval, lane: 0 },
          { time: 166 * beatInterval, lane: 3 },
          { time: 167 * beatInterval, lane: 3 },
          { time: 168 * beatInterval, lane: 0 },
          { time: 169 * beatInterval, lane: 0 },
          { time: 170 * beatInterval, lane: 3 },
          { time: 171 * beatInterval, lane: 1 },
          { time: 172 * beatInterval, lane: 0 },
          { time: 173 * beatInterval, lane: 1 },
          { time: 174 * beatInterval, lane: 0 },
          { time: 175 * beatInterval, lane: 1 },
          { time: 176 * beatInterval, lane: 1 },
          { time: 177 * beatInterval, lane: 3 },
          { time: 178 * beatInterval, lane: 2 },
          { time: 179 * beatInterval, lane: 2 },
          { time: 180 * beatInterval, lane: 0 },
          { time: 181 * beatInterval, lane: 1 },
          { time: 182 * beatInterval, lane: 0 },
          { time: 183 * beatInterval, lane: 2 },
          { time: 184 * beatInterval, lane: 3 },
          { time: 185 * beatInterval, lane: 2 },
          { time: 186 * beatInterval, lane: 1 },
          { time: 187 * beatInterval, lane: 1 },
          { time: 188 * beatInterval, lane: 0 },
          { time: 189 * beatInterval, lane: 1 },
          { time: 190 * beatInterval, lane: 3 },
          { time: 191 * beatInterval, lane: 0 },
          { time: 192 * beatInterval, lane: 1 },
          { time: 193 * beatInterval, lane: 2 },
          { time: 194 * beatInterval, lane: 3 },
          { time: 195 * beatInterval, lane: 0 },
          { time: 196 * beatInterval, lane: 3 },
          { time: 197 * beatInterval, lane: 3 },
          { time: 198 * beatInterval, lane: 0 },
          { time: 199 * beatInterval, lane: 0 },
          { time: 200 * beatInterval, lane: 3 },
          { time: 201 * beatInterval, lane: 1 },
          { time: 202 * beatInterval, lane: 0 },
          { time: 203 * beatInterval, lane: 1 },
          { time: 204 * beatInterval, lane: 0 },
          { time: 205 * beatInterval, lane: 1 },
          { time: 206 * beatInterval, lane: 1 },
          { time: 207 * beatInterval, lane: 3 },
          { time: 208 * beatInterval, lane: 2 },
          { time: 209 * beatInterval, lane: 2 },
          { time: 210 * beatInterval, lane: 0 },
          { time: 211 * beatInterval, lane: 1 },
          { time: 212 * beatInterval, lane: 0 },
          { time: 213 * beatInterval, lane: 2 },
          { time: 214 * beatInterval, lane: 3 },
          { time: 215 * beatInterval, lane: 2 },
          { time: 216 * beatInterval, lane: 1 },
          { time: 217 * beatInterval, lane: 1 },
          { time: 218 * beatInterval, lane: 0 },
          { time: 219 * beatInterval, lane: 1 },
          { time: 220 * beatInterval, lane: 3 },
          { time: 221 * beatInterval, lane: 0 },
          { time: 222 * beatInterval, lane: 0 },
          { time: 223 * beatInterval, lane: 0 },
          { time: 224 * beatInterval, lane: 0 },
          { time: 225 * beatInterval, lane: 3 },
          { time: 226 * beatInterval, lane: 3 },
          { time: 227 * beatInterval, lane: 0 },
          { time: 228 * beatInterval, lane: 0 },
          { time: 229 * beatInterval, lane: 3 },
          { time: 230 * beatInterval, lane: 3 },
          { time: 231 * beatInterval, lane: 0 },
          { time: 232 * beatInterval, lane: 0 },
          { time: 233 * beatInterval, lane: 2 },
          { time: 234 * beatInterval, lane: 2 },
          { time: 235 * beatInterval, lane: 1 },
          { time: 236 * beatInterval, lane: 1 },
          { time: 237 * beatInterval, lane: 2 },
          { time: 238 * beatInterval, lane: 2 },
          { time: 239 * beatInterval, lane: 1 },
          { time: 240 * beatInterval, lane: 1 },
          { time: 241 * beatInterval, lane: 2 },
          { time: 242 * beatInterval, lane: 2 },
          { time: 243 * beatInterval, lane: 0 },
          { time: 244 * beatInterval, lane: 0 },
          { time: 245 * beatInterval, lane: 3 },
          { time: 246 * beatInterval, lane: 3 },
          { time: 247 * beatInterval, lane: 0 },
          { time: 248 * beatInterval, lane: 0 },
          { time: 249 * beatInterval, lane: 3 },
          { time: 250 * beatInterval, lane: 3 },
          { time: 251 * beatInterval, lane: 0 },
          { time: 252 * beatInterval, lane: 0 },
          { time: 253 * beatInterval, lane: 2 },
          { time: 254 * beatInterval, lane: 2 },
          { time: 255 * beatInterval, lane: 1 },
          { time: 256 * beatInterval, lane: 1 },
          { time: 257 * beatInterval, lane: 2 },
          { time: 258 * beatInterval, lane: 2 },
          { time: 259 * beatInterval, lane: 1 },
          { time: 260 * beatInterval, lane: 1 },
          { time: 261 * beatInterval, lane: 2 },
          { time: 262 * beatInterval, lane: 2 },
          { time: 263 * beatInterval, lane: 1 },
          { time: 264 * beatInterval, lane: 1 },
          { time: 265 * beatInterval, lane: 2 },
          { time: 266 * beatInterval, lane: 2 },
          { time: 267 * beatInterval, lane: 1 },
          { time: 268 * beatInterval, lane: 1 },
          { time: 269 * beatInterval, lane: 2 },
          { time: 270 * beatInterval, lane: 2 },
          { time: 271 * beatInterval, lane: 1 },
          { time: 272 * beatInterval, lane: 1 },
          { time: 273 * beatInterval, lane: 3 },
          { time: 274 * beatInterval, lane: 3 },
          { time: 275 * beatInterval, lane: 0 },
          { time: 276 * beatInterval, lane: 0 },
          { time: 277 * beatInterval, lane: 3 },
          { time: 278 * beatInterval, lane: 3 },
          { time: 279 * beatInterval, lane: 0 },
          { time: 280 * beatInterval, lane: 0 },
          { time: 281 * beatInterval, lane: 0 },
          { time: 282 * beatInterval, lane: 0 },
          { time: 283 * beatInterval, lane: 0 },
          { time: 284 * beatInterval, lane: 0 },
          { time: 285 * beatInterval, lane: 3 },
          { time: 286 * beatInterval, lane: 2 },
          { time: 287 * beatInterval, lane: 1 },
          { time: 288 * beatInterval, lane: 3 },
          { time: 289 * beatInterval, lane: 3 },
          { time: 290 * beatInterval, lane: 0 },
          { time: 291 * beatInterval, lane: 1 },
          { time: 292 * beatInterval, lane: 2 },
          { time: 293 * beatInterval, lane: 2 },
          { time: 294 * beatInterval, lane: 0 },
          { time: 295 * beatInterval, lane: 3 },
          { time: 296 * beatInterval, lane: 2 },
          { time: 297 * beatInterval, lane: 1 },
          { time: 298 * beatInterval, lane: 0 },
          { time: 299 * beatInterval, lane: 3 },
          { time: 300 * beatInterval, lane: 2 },
          { time: 301 * beatInterval, lane: 0 },
          { time: 302 * beatInterval, lane: 1 },
          { time: 303 * beatInterval, lane: 1 },
          { time: 304 * beatInterval, lane: 0 },
          { time: 305 * beatInterval, lane: 2 },
          { time: 306 * beatInterval, lane: 3 },
          { time: 307 * beatInterval, lane: 2 },
          { time: 308 * beatInterval, lane: 3 },
          { time: 309 * beatInterval, lane: 1 },
          { time: 310 * beatInterval, lane: 0 },
          { time: 311 * beatInterval, lane: 1 },
          { time: 312 * beatInterval, lane: 0 },
          { time: 313 * beatInterval, lane: 2 },
          { time: 314 * beatInterval, lane: 0 },
          { time: 315 * beatInterval, lane: 0 },
          { time: 316 * beatInterval, lane: 0 },
          { time: 317 * beatInterval, lane: 0 },
          { time: 318 * beatInterval, lane: 0 },
          { time: 319 * beatInterval, lane: 0 }
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
                    this.noteCount++;
                    
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

        if (this.platformGraphics) {
                this.platformGraphics.destroy();
            }

            this.platforms.forEach(platform => {
                if (platform) {
                    this.matter.world.remove(platform);
                }
            });

            if (this.playerGraphics) {
                this.playerGraphics.destroy();
            }

            if (this.player) {
                this.matter.world.remove(this.player);
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
            y: this.player.position.y,
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

        if (playerLane === lane && note.y >= this.player.position.y) {
            this.score++;
            this.playerpop();
            this.currentStreak++;
            if (this.currentStreak > this.highestStreak) {
                this.highestStreak = this.currentStreak;
            }

            this.updateScoreAndStreak();
            this.increaseRedBar();
            this.noteScored = true;
            this.bchangeflag = true;
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

    createStarPop(textobject, xposition = 0, yposition = 0, duration = 1000, starCount = 5) {

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

            let randomX = Phaser.Math.Between(-400, 400);
            let randomY = Phaser.Math.Between(50, 150);
            star.setPosition(this.cameras.main.centerX + xposition + randomX, this.cameras.main.centerY + yposition + randomY);

            star.setScale(randomScale);
            star.setAlpha(1);

            let randomUpwardSpeed = Phaser.Math.FloatBetween(50, 100);
            let randomRotationSpeed = Phaser.Math.FloatBetween(0.01, 0.05);
            
            this.tweens.add({
                targets: star,
                y: star.y - randomUpwardSpeed,
                alpha: 0, 
                angle: star.angle + Phaser.Math.Between(10, 360),
                duration: duration,
                ease: 'Power3',
                onComplete: () => {
                    star.destroy();
                }
            });

            this.tweens.add({
                targets: star,
                angle: star.angle + Phaser.Math.Between(10, 360),
                duration: duration,
                ease: 'Linear',
                repeat: -1
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
    const partWidth = platformWidth / 4;;
    const platformY = this.cameras.main.height - 100;
    const platformX = partWidth * lane;
    const redShades = ['#8B0000', '#A52A2A', '#B22222', '#FF0000', '#FF4D4D', '#FF9999'];

    const missText = this.add.text(
        platformX + partWidth / 2,
        platformY - 50,
        'MISS', 
        {
            fontSize: '32px', 
            fill: Phaser.Utils.Array.GetRandom(redShades), 
            fontFamily: 'Courier New',
            fontStyle: 'bold'
        }
    ).setOrigin(0.5);

    const colorTween = this.time.addEvent({
        delay: 100, 
        callback: () => {
            missText.setColor(Phaser.Utils.Array.GetRandom(redShades));
        },
        loop: true
    });

    this.tweens.add({
        targets: missText,
        y: platformY - 100,
        alpha: 0,
        duration: 1000,
        ease: 'Power1',
        onComplete: () => {
            colorTween.remove();
            missText.destroy();
        }
    });

    const platformRect = this.add.rectangle(platformX + partWidth / 2, platformY, partWidth, 15, Phaser.Utils.Array.GetRandom(redShades))
            .setOrigin(0.5)
            .setAlpha(0);

    const colorTweenRect = this.time.addEvent({
            delay: 50,
            callback: () => {
            const randomColor = Phaser.Display.Color.HexStringToColor(Phaser.Utils.Array.GetRandom(redShades)).color;
            platformRect.setFillStyle(randomColor);
            },
            loop: true
        });

        this.tweens.add({
            targets: platformRect,
            alpha: 0.9,
            duration: 300,
            yoyo: true,
            onComplete: () => {
                colorTweenRect.remove();
                platformRect.destroy();
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
        this.platforms.forEach(platform => {
            if (platform) {
                this.matter.world.remove(platform);
            }
        });

        if (this.player) {
            this.matter.world.remove(this.player);
        }
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

        if (this.score >= 300) {
            return 'S';
        } else if (this.score >= 240) {
            return 'A';
        } else if (this.score >= 200) {
            return 'B';
        } else if (this.score >= 170) {
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

    changeBackground() {
        const backgroundcolors = [
                    0xA8D7F5,
                    0xE5C9B6,
                    0x87C5B3,
                    0xD7BDE2,
                    0x7BAFCC,
                    0xC5C3C8
        ];

        let backColor = Phaser.Utils.Array.GetRandom(backgroundcolors);
        let backColorHex = `#${backColor.toString(16).padStart(6, '0')}`;
        this.cameras.main.setBackgroundColor(backColorHex);
        this.backgroundUpdateNeeded = false;
    }
    
    update() {
            if (document.hidden) {
                if (this.music && this.music.isPlaying && this.musicStarted && !this.isPaused) {
                    this.pauseGame();
                }
            }
        
        if (this.noteCount >= 35 && this.noteCount <= 317) {
                if (this.bchangeflag) {
                    this.changeBackground();
                    this.bchangeflag = false;
                }
            } else if (this.noteCount > 318) {
                this.cameras.main.setBackgroundColor(0x000000);
            }

            if (this.isPaused) return;
        }
}

class Planetloop extends Phaser.Scene {
    constructor() {
        super({
            key: 'Planetloop',
            physics: {
                default: 'matter',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            }
        });
        this.laneColors = [0xFFFFFF, 0xF0F0F0, 0xDCDCDC, 0xC0C0C0];
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
        this.load.audio('gamemusic4', 'Level4-track.mp3');
        this.load.audio('LevelFailed', 'LEVELFAILED.mp3');
        this.load.image('character4Image1', 'planetloop1.png');
        this.load.image('character4Image2', 'planetloop2.png');
        this.load.image('character4Image3', 'planetloop3.png');
        this.load.image('character4Image4', 'planetloop4.png');
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
            0xFFFFFF
        );

        playerGraphics.setStrokeStyle(2, 0xDCDCDC); 

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
            this.music = this.sound.add('gamemusic4', {volume: gamevolume});
        }

        this.input.keyboard.on('keydown-A', () => {
            this.handlePlayerMove(0, 'character4Image1');
        });
        this.input.keyboard.on('keydown-S', () => {
            this.handlePlayerMove(1, 'character4Image2');
        });
        this.input.keyboard.on('keydown-D', () => {
            this.handlePlayerMove(2, 'character4Image3');
        });
        this.input.keyboard.on('keydown-F', () => {
            this.handlePlayerMove(3, 'character4Image4');
        });

        this.input.on('pointerdown', (pointer) => {
            const partWidth = this.cameras.main.width / 1.5 / 4;
            const section = Math.floor(pointer.x / partWidth);

            switch (section) {
                case 0:
                    this.handlePlayerMove(0, 'character4Image1');
                    break;
                case 1:
                    this.handlePlayerMove(1, 'character4Image2');
                    break;
                case 2:
                    this.handlePlayerMove(2, 'character4Image3');
                    break;
                case 3:
                    this.handlePlayerMove(3, 'character4Image4');
                    break;
                default:
                    break;
            }
        });

        this.cameras.main.setBackgroundColor(0x00b8ff);
        
        this.score = 0;
        this.moveMade = false;

        this.scoreText = this.add.text(25, 10, 'Score: ', { fontSize: '24px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif'});
        this.streakText = this.add.text(25, 60, 'Streak: ', { fontSize: '24px', fill: '#FFF', fontFamily: 'Comic Sans MS, sans-serif'});

        this.scoreNumber = this.add.text(120, 8, '0', { fontSize: '28px', fill: '#FFF', fontFamily: 'Comic Sans MS'});
        this.streakNumber = this.add.text(140, 58, '0', { fontSize: '30px', fill: '#FFF', fontFamily: 'Comic Sans MS' });


        this.character = this.add.image(this.cameras.main.width - 100, this.cameras.main.height - 200, 'character4Image1').setScale(0.23);

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

        const beatInterval = 750;

        this.beatmap = [
          { time: 0 * beatInterval, lane: 0 },
          { time: 0.5 * beatInterval, lane: 0 },
          { time: 1 * beatInterval, lane: 0 },
          { time: 1.5 * beatInterval, lane: 0 },
          { time: 2 * beatInterval, lane: 1 },
          { time: 2.5 * beatInterval, lane: 1 },
          { time: 3 * beatInterval, lane: 2 },
          { time: 3.5 * beatInterval, lane: 3 },
          { time: 4 * beatInterval, lane: 2 },
          { time: 4.5 * beatInterval, lane: 1 },
          { time: 5 * beatInterval, lane: 3 },
          { time: 5.5 * beatInterval, lane: 3 },
          { time: 6 * beatInterval, lane: 0 },
          { time: 6.5 * beatInterval, lane: 0 },
          { time: 7 * beatInterval, lane: 1 },
          { time: 7.5 * beatInterval, lane: 1 },
          { time: 8 * beatInterval, lane: 2 },
          { time: 8.5 * beatInterval, lane: 2 },
          { time: 9 * beatInterval, lane: 3 },
          { time: 9.5 * beatInterval, lane: 3 },
          { time: 10 * beatInterval, lane: 1 },
          { time: 10.5 * beatInterval, lane: 2 },
          { time: 11 * beatInterval, lane: 3 },
          { time: 11.5 * beatInterval, lane: 2 },
          { time: 12 * beatInterval, lane: 1 },
          { time: 12.5 * beatInterval, lane: 2 },
          { time: 13 * beatInterval, lane: 3 },
          { time: 13.5 * beatInterval, lane: 2 },
          { time: 14 * beatInterval, lane: 2 },
          { time: 14.5 * beatInterval, lane: 3 },
          { time: 15 * beatInterval, lane: 3 },
          { time: 15.5 * beatInterval, lane: 1 },
          { time: 16 * beatInterval, lane: 1 },
          { time: 16.5 * beatInterval, lane: 2 },
          { time: 17 * beatInterval, lane: 2 },
          { time: 17.5 * beatInterval, lane: 3 },
          { time: 18 * beatInterval, lane: 3 },
          { time: 18.5 * beatInterval, lane: 0 },
          { time: 19 * beatInterval, lane: 0 },
          { time: 19.5 * beatInterval, lane: 1 },
          { time: 20 * beatInterval, lane: 2 },
          { time: 20.5 * beatInterval, lane: 3 },
          { time: 21 * beatInterval, lane: 2 },
          { time: 21.5 * beatInterval, lane: 1 },
          { time: 22 * beatInterval, lane: 0 },
          { time: 22.5 * beatInterval, lane: 2 },
          { time: 23 * beatInterval, lane: 3 },
          { time: 23.5 * beatInterval, lane: 0 },
          { time: 24 * beatInterval, lane: 1 },
          { time: 24.5 * beatInterval, lane: 0 },
          { time: 25 * beatInterval, lane: 3 },
          { time: 25.5 * beatInterval, lane: 2 },
          { time: 26 * beatInterval, lane: 1 },
          { time: 26.5 * beatInterval, lane: 1 },
          { time: 27 * beatInterval, lane: 2 },
          { time: 27.5 * beatInterval, lane: 3 },
          { time: 28 * beatInterval, lane: 2 },
          { time: 28.5 * beatInterval, lane: 0 },
          { time: 29 * beatInterval, lane: 1 },
          { time: 29.5 * beatInterval, lane: 3 },
          { time: 30 * beatInterval, lane: 2 },
          { time: 30.5 * beatInterval, lane: 0 },
          { time: 31 * beatInterval, lane: 1 },
          { time: 31.5 * beatInterval, lane: 0 },
          { time: 32 * beatInterval, lane: 1 },
          { time: 32.5 * beatInterval, lane: 1 },
          { time: 33 * beatInterval, lane: 0 },
          { time: 33.5 * beatInterval, lane: 3 },
          { time: 34 * beatInterval, lane: 2 },
          { time: 34.5 * beatInterval, lane: 3 },
          { time: 35 * beatInterval, lane: 2 },
          { time: 35.5 * beatInterval, lane: 1 },
          { time: 36 * beatInterval, lane: 3 },
          { time: 36.5 * beatInterval, lane: 0 },
          { time: 37 * beatInterval, lane: 0 },
          { time: 37.5 * beatInterval, lane: 1 },
          { time: 38 * beatInterval, lane: 1 },
          { time: 38.5 * beatInterval, lane: 0 },
          { time: 39 * beatInterval, lane: 0 },
          { time: 39.5 * beatInterval, lane: 2 },
          { time: 40 * beatInterval, lane: 2 },
          { time: 40.5 * beatInterval, lane: 0 },
          { time: 41 * beatInterval, lane: 0 },
          { time: 41.5 * beatInterval, lane: 3 },
          { time: 42 * beatInterval, lane: 3 },
          { time: 42.5 * beatInterval, lane: 2 },
          { time: 43 * beatInterval, lane: 1 },
          { time: 43.5 * beatInterval, lane: 3 },
          { time: 44 * beatInterval, lane: 3 },
          { time: 44.5 * beatInterval, lane: 1 },
          { time: 45 * beatInterval, lane: 1 },
          { time: 45.5 * beatInterval, lane: 3 },
          { time: 46 * beatInterval, lane: 3 },
          { time: 46.5 * beatInterval, lane: 2 },
          { time: 47 * beatInterval, lane: 2 },
          { time: 47.5 * beatInterval, lane: 1 },
          { time: 48 * beatInterval, lane: 1 },
          { time: 48.5 * beatInterval, lane: 3 },
          { time: 49 * beatInterval, lane: 2 },
          { time: 49.5 * beatInterval, lane: 1 },
          { time: 50 * beatInterval, lane: 0 },
          { time: 50.5 * beatInterval, lane: 2 },
          { time: 51 * beatInterval, lane: 1 },
          { time: 51.5 * beatInterval, lane: 0 },
          { time: 52 * beatInterval, lane: 3 },
          { time: 52.4 * beatInterval, lane: 2 },
          { time: 52.8 * beatInterval, lane: 1 },
          { time: 53 * beatInterval, lane: 2 },
          { time: 53.4 * beatInterval, lane: 3 },
          { time: 53.8 * beatInterval, lane: 2 },
          { time: 54.2 * beatInterval, lane: 1 },
          { time: 54.6 * beatInterval, lane: 2 },
          { time: 55 * beatInterval, lane: 3 },
          { time: 55.4 * beatInterval, lane: 2 },
          { time: 55.8 * beatInterval, lane: 1 },
          { time: 56.2 * beatInterval, lane: 2 },
          { time: 56.6 * beatInterval, lane: 3 },
          { time: 57 * beatInterval, lane: 2 },
          { time: 57.4 * beatInterval, lane: 1 },
          { time: 57.8 * beatInterval, lane: 2 },
          { time: 58.2 * beatInterval, lane: 3 },
          { time: 58.6 * beatInterval, lane: 2 },
          { time: 59 * beatInterval, lane: 1 },
          { time: 59.4 * beatInterval, lane: 2 },
          { time: 59.8 * beatInterval, lane: 3 },
          { time: 60.2 * beatInterval, lane: 2 },
          { time: 60.6 * beatInterval, lane: 1 },
          { time: 61 * beatInterval, lane: 2 },
          { time: 61.4 * beatInterval, lane: 3 },
          { time: 61.8 * beatInterval, lane: 2 },
          { time: 62.2 * beatInterval, lane: 1 },
          { time: 62.6 * beatInterval, lane: 2 },
          { time: 63 * beatInterval, lane: 3 },
          { time: 63.4 * beatInterval, lane: 2 },
          { time: 63.8 * beatInterval, lane: 1 },
          { time: 64.2 * beatInterval, lane: 2 },
          { time: 64.6 * beatInterval, lane: 3 },
          { time: 65 * beatInterval, lane: 2 },
          { time: 65.4 * beatInterval, lane: 1 },
          { time: 65.8 * beatInterval, lane: 2 },
          { time: 66.1 * beatInterval, lane: 1 },
          { time: 66.2 * beatInterval, lane: 1 },
          { time: 66.3 * beatInterval, lane: 1 },
          { time: 66.4 * beatInterval, lane: 1 },
          { time: 66.5 * beatInterval, lane: 1 },
          { time: 66.6 * beatInterval, lane: 1 },
          { time: 66.7 * beatInterval, lane: 1 },
          { time: 66.8 * beatInterval, lane: 1 },
          { time: 66.9 * beatInterval, lane: 1 },
          { time: 67 * beatInterval, lane: 1 },
          { time: 67.5 * beatInterval, lane: 0 },
          { time: 68 * beatInterval, lane: 0 },
          { time: 68.5 * beatInterval, lane: 2 },
          { time: 69 * beatInterval, lane: 2 },
          { time: 69.5 * beatInterval, lane: 0 },
          { time: 70 * beatInterval, lane: 0 },
          { time: 70.5 * beatInterval, lane: 2 },
          { time: 71 * beatInterval, lane: 2 },
          { time: 71.5 * beatInterval, lane: 0 },
          { time: 72 * beatInterval, lane: 0 },
          { time: 72.5 * beatInterval, lane: 2 },
          { time: 73 * beatInterval, lane: 2 },
          { time: 73.5 * beatInterval, lane: 3 },
          { time: 74 * beatInterval, lane: 2 },
          { time: 74.5 * beatInterval, lane: 1 },
          { time: 75 * beatInterval, lane: 2 },
          { time: 75.5 * beatInterval, lane: 3 },
          { time: 76 * beatInterval, lane: 0 },
          { time: 76.5 * beatInterval, lane: 0 },
          { time: 77 * beatInterval, lane: 0 },
          { time: 77.5 * beatInterval, lane: 3 },
          { time: 78 * beatInterval, lane: 3 },
          { time: 78.5 * beatInterval, lane: 0 },
          { time: 79 * beatInterval, lane: 0 },
          { time: 79.5 * beatInterval, lane: 1 },
          { time: 80 * beatInterval, lane: 2 },
          { time: 80.5 * beatInterval, lane: 3 },
          { time: 81 * beatInterval, lane: 2 },
          { time: 81.5 * beatInterval, lane: 1 },
          { time: 82 * beatInterval, lane: 0 },
          { time: 82.5 * beatInterval, lane: 0 },
          { time: 83 * beatInterval, lane: 1 },
          { time: 83.5 * beatInterval, lane: 1 },
          { time: 84 * beatInterval, lane: 0 },
          { time: 84.5 * beatInterval, lane: 0 },
          { time: 85 * beatInterval, lane: 1 },
          { time: 85.5 * beatInterval, lane: 1 },
          { time: 86 * beatInterval, lane: 0 },
          { time: 86.5 * beatInterval, lane: 0 },
          { time: 87 * beatInterval, lane: 1 },
          { time: 87.5 * beatInterval, lane: 1 },
          { time: 88 * beatInterval, lane: 0 },
          { time: 88.5 * beatInterval, lane: 0 },
          { time: 89 * beatInterval, lane: 1 },
          { time: 89.5 * beatInterval, lane: 1 },
          { time: 90 * beatInterval, lane: 0 },
          { time: 90.5 * beatInterval, lane: 0 },
          { time: 91 * beatInterval, lane: 1 },
          { time: 91.5 * beatInterval, lane: 1 },
          { time: 92 * beatInterval, lane: 0 },
          { time: 92.5 * beatInterval, lane: 0 },
          { time: 93 * beatInterval, lane: 1 },
          { time: 93.5 * beatInterval, lane: 1 },
          { time: 94 * beatInterval, lane: 0 },
          { time: 94.5 * beatInterval, lane: 1 },
          { time: 95 * beatInterval, lane: 2 },
          { time: 95.5 * beatInterval, lane: 3 },
          { time: 96 * beatInterval, lane: 2 },
          { time: 96.5 * beatInterval, lane: 1 },
          { time: 97 * beatInterval, lane: 1 },
          { time: 97.5 * beatInterval, lane: 0 },
          { time: 98 * beatInterval, lane: 0 },
          { time: 98.5 * beatInterval, lane: 1 },
          { time: 99 * beatInterval, lane: 1 },
          { time: 99.5 * beatInterval, lane: 0 },
          { time: 100 * beatInterval, lane: 0 },
          { time: 100.5 * beatInterval, lane: 1 },
          { time: 101 * beatInterval, lane: 1 },
          { time: 101.5 * beatInterval, lane: 0 },
          { time: 102 * beatInterval, lane: 0 },
          { time: 102.5 * beatInterval, lane: 1 },
          { time: 103 * beatInterval, lane: 2 },
          { time: 103.5 * beatInterval, lane: 3 },
          { time: 104 * beatInterval, lane: 2 },
          { time: 104.5 * beatInterval, lane: 0 },
          { time: 105 * beatInterval, lane: 0 },
          { time: 105.5 * beatInterval, lane: 1 },
          { time: 106 * beatInterval, lane: 1 },
          { time: 106.5 * beatInterval, lane: 0 },
          { time: 107 * beatInterval, lane: 0 },
          { time: 107.5 * beatInterval, lane: 1 },
          { time: 108 * beatInterval, lane: 1 },
          { time: 108.5 * beatInterval, lane: 0 },
          { time: 109 * beatInterval, lane: 0 },
          { time: 109.5 * beatInterval, lane: 1 },
          { time: 110 * beatInterval, lane: 2 },
          { time: 110.5 * beatInterval, lane: 3 },
          { time: 111 * beatInterval, lane: 2 },
          { time: 111.5 * beatInterval, lane: 1 },
          { time: 112 * beatInterval, lane: 0 },
          { time: 112.5 * beatInterval, lane: 0 },
          { time: 113 * beatInterval, lane: 1 },
          { time: 113.5 * beatInterval, lane: 1 },
          { time: 114 * beatInterval, lane: 0 },
          { time: 114.5 * beatInterval, lane: 0 },
          { time: 115 * beatInterval, lane: 1 },
          { time: 115.5 * beatInterval, lane: 1 },
          { time: 116 * beatInterval, lane: 0 },
          { time: 116.5 * beatInterval, lane: 0 },
          { time: 117 * beatInterval, lane: 1 },
          { time: 117.5 * beatInterval, lane: 2 },
          { time: 118 * beatInterval, lane: 3 },
          { time: 118.5 * beatInterval, lane: 2 },
          { time: 119 * beatInterval, lane: 1 },
          { time: 119.5 * beatInterval, lane: 1 },
          { time: 120 * beatInterval, lane: 3 },
          { time: 120.5 * beatInterval, lane: 3 },
          { time: 121 * beatInterval, lane: 0 },
          { time: 121.5 * beatInterval, lane: 0 },
          { time: 122 * beatInterval, lane: 1 },
          { time: 122.5 * beatInterval, lane: 1 },
          { time: 123 * beatInterval, lane: 0 },
          { time: 123.5 * beatInterval, lane: 0 },
          { time: 124 * beatInterval, lane: 1 },
          { time: 124.5 * beatInterval, lane: 1 },
          { time: 125 * beatInterval, lane: 2 },
          { time: 125.5 * beatInterval, lane: 2 },
          { time: 126. * beatInterval, lane: 3 },
          { time: 126.5 * beatInterval, lane: 2 },
          { time: 127 * beatInterval, lane: 1 },
          { time: 127.4 * beatInterval, lane: 3 },
          { time: 127.7 * beatInterval, lane: 2 },
          { time: 128 * beatInterval, lane: 1 },
          { time: 128.3 * beatInterval, lane: 0 },
          { time: 128.6 * beatInterval, lane: 0 },
          { time: 128.9 * beatInterval, lane: 1 },
          { time: 129.2 * beatInterval, lane: 2 },
          { time: 129.5 * beatInterval, lane: 3 },
          { time: 129.8 * beatInterval, lane: 3 },
          { time: 130.1 * beatInterval, lane: 2 },
          { time: 130.4 * beatInterval, lane: 1 },
          { time: 130.7 * beatInterval, lane: 0 },
          { time: 131 * beatInterval, lane: 0 },
          { time: 131.3 * beatInterval, lane: 1 },
          { time: 131.6 * beatInterval, lane: 2 },
          { time: 131.9 * beatInterval, lane: 3 },
          { time: 132.2 * beatInterval, lane: 3 },
          { time: 132.5 * beatInterval, lane: 2 },
          { time: 132.8 * beatInterval, lane: 1 },
          { time: 133.1 * beatInterval, lane: 0 },
          { time: 133.4 * beatInterval, lane: 0 },
          { time: 133.7 * beatInterval, lane: 1 },
          { time: 134 * beatInterval, lane: 2 },
          { time: 134.2 * beatInterval, lane: 3 },
          { time: 134.5 * beatInterval, lane: 3 },
          { time: 134.8 * beatInterval, lane: 2 },
          { time: 135.1 * beatInterval, lane: 1 },
          { time: 135.4 * beatInterval, lane: 0 },
          { time: 135.7 * beatInterval, lane: 0 },
          { time: 136 * beatInterval, lane: 1 },
          { time: 136.3 * beatInterval, lane: 2 },
          { time: 136.6 * beatInterval, lane: 3 },
          { time: 136.9 * beatInterval, lane: 3 },
          { time: 137.2 * beatInterval, lane: 2 },
          { time: 137.5 * beatInterval, lane: 1 },
          { time: 137.8 * beatInterval, lane: 0 },
          { time: 138.1 * beatInterval, lane: 0 },
          { time: 138.4 * beatInterval, lane: 1 },
          { time: 138.7 * beatInterval, lane: 2 },
          { time: 139 * beatInterval, lane: 3 },
          { time: 139.3 * beatInterval, lane: 3 },
          { time: 139.6 * beatInterval, lane: 2 },
          { time: 139.9 * beatInterval, lane: 1 },
          { time: 140.2 * beatInterval, lane: 0 },
          { time: 140.5 * beatInterval, lane: 0 },
          { time: 140.8 * beatInterval, lane: 1 },
          { time: 141.1 * beatInterval, lane: 2 },
          { time: 141.4 * beatInterval, lane: 3 },
          { time: 141.7 * beatInterval, lane: 3 },
          { time: 142 * beatInterval, lane: 0 },
          { time: 142.3 * beatInterval, lane: 0 },
          { time: 142.6 * beatInterval, lane: 2 },
          { time: 142.9 * beatInterval, lane: 3 },
          { time: 143.2 * beatInterval, lane: 1 },
          { time: 143.5 * beatInterval, lane: 0 },
          { time: 143.8 * beatInterval, lane: 2 },
          { time: 144.1 * beatInterval, lane: 3 },
          { time: 144.4 * beatInterval, lane: 1 },
          { time: 144.7 * beatInterval, lane: 0 },
          { time: 145 * beatInterval, lane: 2 },
          { time: 145.3 * beatInterval, lane: 3 },
          { time: 145.6 * beatInterval, lane: 1 },
          { time: 145.9 * beatInterval, lane: 0 },
          { time: 146.2 * beatInterval, lane: 1 },
          { time: 146.5 * beatInterval, lane: 0 },
          { time: 146.8 * beatInterval, lane: 1 },
          { time: 147.1 * beatInterval, lane: 0 },
          { time: 147.4 * beatInterval, lane: 2 },
          { time: 147.7 * beatInterval, lane: 3 },
          { time: 148 * beatInterval, lane: 2 },
          { time: 148.3 * beatInterval, lane: 3 },
          { time: 148.6 * beatInterval, lane: 2 },
          { time: 148.9 * beatInterval, lane: 3 },
          { time: 149.2 * beatInterval, lane: 0 },
          { time: 149.5 * beatInterval, lane: 1 },
          { time: 149.8 * beatInterval, lane: 2 },
          { time: 150.1 * beatInterval, lane: 3 },
          { time: 150.4 * beatInterval, lane: 0 },
          { time: 150.7 * beatInterval, lane: 1 },
          { time: 151 * beatInterval, lane: 2 },
          { time: 151.3 * beatInterval, lane: 3 },
          { time: 151.6 * beatInterval, lane: 0 },
          { time: 151.9 * beatInterval, lane: 1 },
          { time: 152.2 * beatInterval, lane: 2 },
          { time: 152.5 * beatInterval, lane: 3 },
          { time: 152.8 * beatInterval, lane: 0 },
          { time: 153.1 * beatInterval, lane: 1 },
          { time: 153.4 * beatInterval, lane: 2 },
          { time: 153.7 * beatInterval, lane: 3 },
          { time: 154 * beatInterval, lane: 0 },
          { time: 154.3 * beatInterval, lane: 1 },
          { time: 154.6 * beatInterval, lane: 2 },
          { time: 154.9 * beatInterval, lane: 3 },
          { time: 155.2 * beatInterval, lane: 0 },
          { time: 155.5 * beatInterval, lane: 0 },
          { time: 155.8 * beatInterval, lane: 0 },
          { time: 156.1 * beatInterval, lane: 0 },
          { time: 156.4 * beatInterval, lane: 0 },
          { time: 156.7 * beatInterval, lane: 2 },
          { time: 157 * beatInterval, lane: 3 },
          { time: 157.5 * beatInterval, lane: 0 },
          { time: 158 * beatInterval, lane: 1 },
          { time: 158.5 * beatInterval, lane: 0 },
          { time: 159 * beatInterval, lane: 2 },
          { time: 159.5 * beatInterval, lane: 0 },
          { time: 160 * beatInterval, lane: 3 },
          { time: 160.5 * beatInterval, lane: 1 },
          { time: 161 * beatInterval, lane: 3 },
          { time: 161.5 * beatInterval, lane: 0 },
          { time: 162 * beatInterval, lane: 2 },
          { time: 162.5 * beatInterval, lane: 0 },
          { time: 163 * beatInterval, lane: 3 },
          { time: 163.5 * beatInterval, lane: 1 },
          { time: 164 * beatInterval, lane: 3 },
          { time: 164.5 * beatInterval, lane: 0 },
          { time: 165 * beatInterval, lane: 2 },
          { time: 165.5 * beatInterval, lane: 0 },
          { time: 166 * beatInterval, lane: 3 },
          { time: 166.5 * beatInterval, lane: 1 },
          { time: 167 * beatInterval, lane: 3 },
          { time: 167.5 * beatInterval, lane: 0 },
          { time: 168 * beatInterval, lane: 2 },
          { time: 168.5 * beatInterval, lane: 0 },
          { time: 169 * beatInterval, lane: 3 },
          { time: 169.5 * beatInterval, lane: 1 },
          { time: 170 * beatInterval, lane: 0 },
          { time: 170.5 * beatInterval, lane: 3 },
          { time: 171 * beatInterval, lane: 0 },
          { time: 171.5 * beatInterval, lane: 2 },
          { time: 172 * beatInterval, lane: 3 },
          { time: 173.5 * beatInterval, lane: 0 },
          { time: 174 * beatInterval, lane: 0 },
          { time: 174.5 * beatInterval, lane: 1 },
          { time: 175 * beatInterval, lane: 1 },
          { time: 175.5 * beatInterval, lane: 0 },
          { time: 176 * beatInterval, lane: 0 },
          { time: 176.5 * beatInterval, lane: 2 },
          { time: 177 * beatInterval, lane: 2 },
          { time: 177.5 * beatInterval, lane: 0 },
          { time: 178 * beatInterval, lane: 0 },
          { time: 178.5 * beatInterval, lane: 3 },
          { time: 179 * beatInterval, lane: 3 },
          { time: 179.5 * beatInterval, lane: 0 },
          { time: 180 * beatInterval, lane: 0 },
          { time: 180.5 * beatInterval, lane: 3 },
          { time: 181 * beatInterval, lane: 3 },
          { time: 181.5 * beatInterval, lane: 0 },
          { time: 182 * beatInterval, lane: 0 },
          { time: 182.5 * beatInterval, lane: 2 },
          { time: 183 * beatInterval, lane: 2 },
          { time: 183.5 * beatInterval, lane: 0 },
          { time: 184 * beatInterval, lane: 0 },
          { time: 184.5 * beatInterval, lane: 1 },
          { time: 185 * beatInterval, lane: 1 },
          { time: 185.5 * beatInterval, lane: 0 },
          { time: 186 * beatInterval, lane: 0 },
          { time: 186.5 * beatInterval, lane: 2 },
          { time: 187 * beatInterval, lane: 3 },
          { time: 187.5 * beatInterval, lane: 3 },
          { time: 188 * beatInterval, lane: 2 },
          { time: 188.5 * beatInterval, lane: 2 },
          { time: 189 * beatInterval, lane: 3 },
          { time: 189.5 * beatInterval, lane: 3 },
          { time: 190 * beatInterval, lane: 2 },
          { time: 190.5 * beatInterval, lane: 2 },
          { time: 191 * beatInterval, lane: 3 },
          { time: 191.5 * beatInterval, lane: 3 },
          { time: 192 * beatInterval, lane: 2 },
          { time: 192.5 * beatInterval, lane: 2 },
          { time: 193 * beatInterval, lane: 3 },
          { time: 193.5 * beatInterval, lane: 3 },
          { time: 194 * beatInterval, lane: 2 },
          { time: 194.5 * beatInterval, lane: 2 },
          { time: 195 * beatInterval, lane: 3 },
          { time: 195.5 * beatInterval, lane: 3 },
          { time: 196 * beatInterval, lane: 2 },
          { time: 196.5 * beatInterval, lane: 2 },
          { time: 197 * beatInterval, lane: 3 },
          { time: 197.5 * beatInterval, lane: 3 },
          { time: 198 * beatInterval, lane: 2 },
          { time: 198.5 * beatInterval, lane: 2 },
          { time: 199 * beatInterval, lane: 3 },
          { time: 199.5 * beatInterval, lane: 3 },
          { time: 200 * beatInterval, lane: 2 },
          { time: 200.5 * beatInterval, lane: 2 },
          { time: 201 * beatInterval, lane: 3 },
          { time: 201.5 * beatInterval, lane: 3 },
          { time: 202 * beatInterval, lane: 2 },
          { time: 202.5 * beatInterval, lane: 2 },
          { time: 203 * beatInterval, lane: 3 },
          { time: 203.5 * beatInterval, lane: 2 },
          { time: 204 * beatInterval, lane: 1 },
          { time: 204.5 * beatInterval, lane: 2 },
          { time: 205 * beatInterval, lane: 3 },
          { time: 205.5 * beatInterval, lane: 0 },
          { time: 206 * beatInterval, lane: 1 },
          { time: 206.5 * beatInterval, lane: 2 },
          { time: 207 * beatInterval, lane: 2 },
          { time: 207.5 * beatInterval, lane: 1 },
          { time: 208 * beatInterval, lane: 0 },
          { time: 208.5 * beatInterval, lane: 1 },
          { time: 209 * beatInterval, lane: 2 },
          { time: 209.5 * beatInterval, lane: 2 },
          { time: 210 * beatInterval, lane: 2 },
          { time: 210.5 * beatInterval, lane: 0 },
          { time: 211 * beatInterval, lane: 1 },
          { time: 211.5 * beatInterval, lane: 0 },
          { time: 212 * beatInterval, lane: 1 },
          { time: 212.5 * beatInterval, lane: 0 },
          { time: 213 * beatInterval, lane: 1 },
          { time: 213.5 * beatInterval, lane: 0 },
          { time: 214 * beatInterval, lane: 1 },
          { time: 214.5 * beatInterval, lane: 2 },
          { time: 215 * beatInterval, lane: 2 },
          { time: 215.5 * beatInterval, lane: 1 },
          { time: 216 * beatInterval, lane: 0 },
          { time: 216.5 * beatInterval, lane: 1 },
          { time: 217 * beatInterval, lane: 2 },
          { time: 217.5 * beatInterval, lane: 2 },
          { time: 218 * beatInterval, lane: 2 },
          { time: 218.5 * beatInterval, lane: 3 },
          { time: 219 * beatInterval, lane: 2 },
          { time: 219.5 * beatInterval, lane: 3 },
          { time: 220 * beatInterval, lane: 2 },
          { time: 220.5 * beatInterval, lane: 3 },
          { time: 221 * beatInterval, lane: 2 },
          { time: 221.5 * beatInterval, lane: 3 },
          { time: 222 * beatInterval, lane: 2 },
          { time: 222.5 * beatInterval, lane: 2 },
          { time: 223 * beatInterval, lane: 1 },
          { time: 223.5 * beatInterval, lane: 0 },
          { time: 224 * beatInterval, lane: 1 },
          { time: 224.5 * beatInterval, lane: 2 },
          { time: 225 * beatInterval, lane: 2 },
          { time: 225.5 * beatInterval, lane: 2 },
          { time: 226 * beatInterval, lane: 0 },
          { time: 226.5 * beatInterval, lane: 1 },
          { time: 227 * beatInterval, lane: 0 },
          { time: 227.5 * beatInterval, lane: 1 },
          { time: 228 * beatInterval, lane: 0 },
          { time: 228.5 * beatInterval, lane: 1 },
          { time: 229 * beatInterval, lane: 0 },
          { time: 229.5 * beatInterval, lane: 2 },
          { time: 230 * beatInterval, lane: 2 },
          { time: 230.5 * beatInterval, lane: 1 },
          { time: 231 * beatInterval, lane: 0 },
          { time: 231.5 * beatInterval, lane: 1 },
          { time: 232 * beatInterval, lane: 2 },
          { time: 232.5 * beatInterval, lane: 2 },
          { time: 233 * beatInterval, lane: 2 },
          { time: 233.5 * beatInterval, lane: 3 },
          { time: 234 * beatInterval, lane: 2 },
          { time: 234.5 * beatInterval, lane: 3 },
          { time: 235 * beatInterval, lane: 2 },
          { time: 235.5 * beatInterval, lane: 3 },
          { time: 236 * beatInterval, lane: 2 },
          { time: 236.5 * beatInterval, lane: 3 },
          { time: 237 * beatInterval, lane: 2 },
          { time: 237.5 * beatInterval, lane: 2 },
          { time: 238 * beatInterval, lane: 1 },
          { time: 238.5 * beatInterval, lane: 0 },
          { time: 239 * beatInterval, lane: 1 },
          { time: 239.5 * beatInterval, lane: 2 },
          { time: 240 * beatInterval, lane: 2 },
          { time: 240.5 * beatInterval, lane: 2 },
          { time: 241 * beatInterval, lane: 0 },
          { time: 241.5 * beatInterval, lane: 1 },
          { time: 242 * beatInterval, lane: 0 },
          { time: 242.5 * beatInterval, lane: 1 },
          { time: 243 * beatInterval, lane: 0 },
          { time: 243.5 * beatInterval, lane: 1 },
          { time: 244 * beatInterval, lane: 2 },
          { time: 244.5 * beatInterval, lane: 2 },
          { time: 245 * beatInterval, lane: 1 },
          { time: 245.5 * beatInterval, lane: 0 },
          { time: 246 * beatInterval, lane: 1 },
          { time: 246.5 * beatInterval, lane: 2 },
          { time: 247 * beatInterval, lane: 2 },
          { time: 247.5 * beatInterval, lane: 2 },
          { time: 248 * beatInterval, lane: 3 },
          { time: 248.5 * beatInterval, lane: 2 },
          { time: 249 * beatInterval, lane: 3 },
          { time: 249.5 * beatInterval, lane: 2 },
          { time: 250 * beatInterval, lane: 3 },
          { time: 250.5 * beatInterval, lane: 2 },
          { time: 251 * beatInterval, lane: 3 },
          { time: 251.5 * beatInterval, lane: 2 },
          { time: 252 * beatInterval, lane: 2 },
          { time: 252.5 * beatInterval, lane: 2 },
          { time: 253 * beatInterval, lane: 1 },
          { time: 253.5 * beatInterval, lane: 0 },
          { time: 254 * beatInterval, lane: 1 },
          { time: 254.5 * beatInterval, lane: 2 },
          { time: 255 * beatInterval, lane: 2 },
          { time: 255.5 * beatInterval, lane: 2 },
          { time: 256 * beatInterval, lane: 0 },
          { time: 256.5 * beatInterval, lane: 1 },
          { time: 257 * beatInterval, lane: 0 },
          { time: 257.5 * beatInterval, lane: 1 },
          { time: 258 * beatInterval, lane: 0 },
          { time: 258.5 * beatInterval, lane: 1 },
          { time: 259 * beatInterval, lane: 0 },
          { time: 259.5 * beatInterval, lane: 1 },
          { time: 260 * beatInterval, lane: 2 },
          { time: 260.5 * beatInterval, lane: 2 },
          { time: 261 * beatInterval, lane: 1 },
          { time: 261.5 * beatInterval, lane: 0 },
          { time: 262 * beatInterval, lane: 1 },
          { time: 262.5 * beatInterval, lane: 2 },
          { time: 263 * beatInterval, lane: 2 },
          { time: 263.5 * beatInterval, lane: 2 },
          { time: 264 * beatInterval, lane: 3 },
          { time: 264.5 * beatInterval, lane: 2 },
          { time: 265 * beatInterval, lane: 3 },
          { time: 265.5 * beatInterval, lane: 2 },
          { time: 266 * beatInterval, lane: 3 },
          { time: 266.5 * beatInterval, lane: 2 },
          { time: 267 * beatInterval, lane: 1 },
          { time: 270 * beatInterval, lane: 2 },
          { time: 270.2 * beatInterval, lane: 2 },
          { time: 270.5 * beatInterval, lane: 3 },
          { time: 270.7 * beatInterval, lane: 3 }, 
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

        if (this.platformGraphics) {
            this.platformGraphics.destroy();
        }

        this.platforms.forEach(platform => {
            if (platform) {
                this.matter.world.remove(platform);
            }
        });

        if (this.playerGraphics) {
            this.playerGraphics.destroy();
        }

        if (this.player) {
            this.matter.world.remove(this.player);
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
            y: this.player.position.y,
            duration: 2000,
            paused: this.isPaused,
            onComplete: () => {
                this.checkNoteHit(noteData.lane, note);
            }
        });
    }

    handlePlayerMove(lane, characterImage) {
        this.movePlayerTo(lane);
    this.character.setTexture(characterImage).setScale(0.23);
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

        if (playerLane === lane && note.y >= this.player.position.y) {
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
        const originalScale = 0.23; 
        const popScale = 0.24;

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

    createStarPop(textObject, yposition = 0, duration = 1000, starCount = 5) {

        const pastelColors = [
            0xF5F5DC, 0xFDF5E6, 0xFAEBD7, 0xF0EAD6, 0xECE5DA, 0xEDEAE0, 0xF7F2E1, 0xFBF5EF, 0xFFF5EE, 0xF0E8D8
        ];

        for (let i = 0; i < starCount; i++) {
            let star = this.add.graphics();
            let randomColor = Phaser.Utils.Array.GetRandom(pastelColors);
            let randomScale = Phaser.Math.FloatBetween(0.2, 0.7);
            let randomRotationSpeed = Phaser.Math.FloatBetween(0.01, 0.05);
            let randomRotationDirection = Phaser.Math.Between(0, 1) ? 1 : -1;
            let randomDistance = Phaser.Math.Between(200, 500);

            let starPath = this.getStarPath(0, 0, 5, 20 * randomScale, 40 * randomScale);
            star.fillStyle(randomColor, 1);
            star.beginPath();
            star.moveTo(starPath[0].x, starPath[0].y);

            for (let j = 1; j < starPath.length; j++) {
                star.lineTo(starPath[j].x, starPath[j].y);
            }

            star.closePath();
            star.fillPath();

            let randomX = Phaser.Math.Between(0, this.cameras.main.width);
            star.setPosition(randomX, -50);

            star.setScale(randomScale);
            star.setAlpha(1);

            this.tweens.add({
                targets: star,
                y: textObject.y + yposition + randomDistance,
                rotation: randomRotationDirection * randomRotationSpeed * duration,
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
    const partWidth = platformWidth / 4;;
    const platformY = this.cameras.main.height - 100;
    const platformX = partWidth * lane;
    const redShades = ['#8B0000', '#A52A2A', '#B22222', '#FF0000', '#FF4D4D', '#FF9999'];

    const missText = this.add.text(
        platformX + partWidth / 2,
        platformY - 50,
        'MISS', 
        {
            fontSize: '32px', 
            fill: Phaser.Utils.Array.GetRandom(redShades), 
            fontFamily: 'Courier New',
            fontStyle: 'bold'
        }
    ).setOrigin(0.5);

    const colorTween = this.time.addEvent({
        delay: 100, 
        callback: () => {
            missText.setColor(Phaser.Utils.Array.GetRandom(redShades));
        },
        loop: true
    });

    this.tweens.add({
        targets: missText,
        y: platformY - 100,
        alpha: 0,
        duration: 1000,
        ease: 'Power1',
        onComplete: () => {
            colorTween.remove();
            missText.destroy();
        }
    });

    const platformRect = this.add.rectangle(platformX + partWidth / 2, platformY, partWidth, 15, Phaser.Utils.Array.GetRandom(redShades))
            .setOrigin(0.5)
            .setAlpha(0);

    const colorTweenRect = this.time.addEvent({
            delay: 50,
            callback: () => {
            const randomColor = Phaser.Display.Color.HexStringToColor(Phaser.Utils.Array.GetRandom(redShades)).color;
            platformRect.setFillStyle(randomColor);
            },
            loop: true
        });

        this.tweens.add({
            targets: platformRect,
            alpha: 0.9,
            duration: 300,
            yoyo: true,
            onComplete: () => {
                colorTweenRect.remove();
                platformRect.destroy();
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

        if (this.score >= 300) {
            this.createStarPop(this.character, 0, 1000, 15);
        } else if (this.score >= 200) {
            this.createStarPop(this.character, 0, 1000, 10);
        } else if (this.score >= 100) {
            this.createStarPop(this.character, 0, 1000, 5);
        } else if (this.score >= 50) {
            this.createStarPop(this.character, 0, 1000, 3);
        } else if (this.score >= 1) {
            this.createStarPop(this.character, 0, 1000, 1);
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
        this.platforms.forEach(platform => {
            if (platform) {
                this.matter.world.remove(platform);
            }
        });

        if (this.player) {
            this.matter.world.remove(this.player);
        }
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

        if (this.score >= 580) {
            return 'S';
        } else if (this.score >= 500) {
            return 'A';
        } else if (this.score >= 420) {
            return 'B';
        } else if (this.score >= 320) {
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

class FinalBoss extends Phaser.Scene {
    constructor() {
        super({
            key: 'FinalBoss',
            physics: {
                default: 'matter',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            }
        });
        this.laneColors = [0x001f3f, 0x5f00b2, 0x003366, 0x3f0071]
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

        const gradientColors = [0x800080, 0x4B0082, 0x9932CC, 0x8A2BE2];
        let colorIndex = 0;
        
        this.time.addEvent({
            delay: 200,
            callback: () => {
                colorIndex = (colorIndex + 1) % gradientColors.length;
            },
            loop: true
        });
        
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(gradientColors[colorIndex], 1);
            progressBar.fillRect(width / 4, height / 2 - 15, (width / 2) * value, 30);
        });

        this.load.audio('SRANKSOUND', 'Sranksound.mp3');
        this.load.audio('ARANKSOUND', 'Aranksound.mp3');
        this.load.audio('gameomusic5', 'Level5-track.mp3');
        this.load.audio('LevelFailed', 'LEVELFAILED.mp3');
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
        const offsetX = (this.cameras.main.width - platformWidth) / 2;
        
        for (let i = 0; i < 4; i++) {
            const platformX = partWidth * i + partWidth / 2 + offsetX;

            platformGraphics.strokeRect(platformX - partWidth / 2, platformY - platformHeight / 2, partWidth, platformHeight);

            const platform = this.matter.add.rectangle(platformX, platformY, partWidth, platformHeight, { isStatic: true });
            this.platforms.push(platform);
        }

        this.player = this.matter.add.rectangle(partWidth / 2 + offsetX, platformY - 25, partWidth, 5, { isStatic: true });

        let playerGraphics = this.add.rectangle(
            partWidth / 2 + offsetX, 
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
            this.music = this.sound.add('gameomusic5', {volume: gamevolume});
        }

        this.input.keyboard.on('keydown-A', () => {
            this.handlePlayerMove(0);
        });
        this.input.keyboard.on('keydown-S', () => {
            this.handlePlayerMove(1);
        });
        this.input.keyboard.on('keydown-D', () => {
            this.handlePlayerMove(2);
        });
        this.input.keyboard.on('keydown-F', () => {
            this.handlePlayerMove(3);
        });

        this.input.on('pointerdown', (pointer) => {
            const platformWidth = this.cameras.main.width / 1.5;
            const partWidth = platformWidth / 4;
            const offsetX = (this.cameras.main.width - platformWidth) / 2;

            const adjustedX = pointer.x - offsetX;
            const section = Math.floor(adjustedX / partWidth);


            switch (section) {
                case 0:
                    this.handlePlayerMove(0);
                    break;
                case 1:
                    this.handlePlayerMove(1);
                    break;
                case 2:
                    this.handlePlayerMove(2);
                    break;
                case 3:
                    this.handlePlayerMove(3);
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

        const pauseButton = this.pauseButton = this.add.image(this.cameras.main.width - 120, 80, 'pausebutton')
            .setScale(0.3);
        this.addButtonEffects(pauseButton);
            pauseButton.on('pointerdown', () => this.pauseGame());

        const redBarHeight = 10;

        this.redBarMaxWidth = platformWidth;
        this.redBarWidth = platformWidth;

        this.redBar = this.add.rectangle(
            220 + offsetX,
            390,
            this.redBarWidth,
            redBarHeight,
            0xffffff
        ).setOrigin(0.5, 0.5);

        const beatInterval = 461.54;

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
          { time: 11 * beatInterval, lane: 1 },
          { time: 12 * beatInterval, lane: 0 },
          { time: 13 * beatInterval, lane: 0 },
          { time: 14 * beatInterval, lane: 1 },
          { time: 15 * beatInterval, lane: 1 },
          { time: 16 * beatInterval, lane: 0 },
          { time: 16.5 * beatInterval, lane: 1 },
          { time: 17 * beatInterval, lane: 2 },
          { time: 17.5 * beatInterval, lane: 3 },
          { time: 18 * beatInterval, lane: 2 },
          { time: 18.5 * beatInterval, lane: 0 },
          { time: 19 * beatInterval, lane: 3 },
          { time: 20 * beatInterval, lane: 2 },
          { time: 20.5 * beatInterval, lane: 1 },
          { time: 21 * beatInterval, lane: 0 },
          { time: 21.5 * beatInterval, lane: 1 },
          { time: 22 * beatInterval, lane: 0 },
          { time: 22.5 * beatInterval, lane: 1 },
          { time: 23 * beatInterval, lane: 0 },
          { time: 23.5 * beatInterval, lane: 1 },
          { time: 24 * beatInterval, lane: 0 },
          { time: 24.5 * beatInterval, lane: 1 },
          { time: 25 * beatInterval, lane: 0 },
          { time: 25.5 * beatInterval, lane: 1 },
          { time: 26 * beatInterval, lane: 0 },
          { time: 26.5 * beatInterval, lane: 1 },
          { time: 27 * beatInterval, lane: 0 },
          { time: 27.5 * beatInterval, lane: 1 },
          { time: 28 * beatInterval, lane: 0 },
          { time: 28.5 * beatInterval, lane: 1 },
          { time: 29 * beatInterval, lane: 0 },
          { time: 29.5 * beatInterval, lane: 2 },
          { time: 30 * beatInterval, lane: 1 },
          { time: 30.5 * beatInterval, lane: 2 },
          { time: 31 * beatInterval, lane: 1 },
          { time: 32 * beatInterval, lane: 2 },
          { time: 33 * beatInterval, lane: 1 },
          { time: 34 * beatInterval, lane: 2 },
          { time: 35 * beatInterval, lane: 2 },
          { time: 36 * beatInterval, lane: 3 },
          { time: 37 * beatInterval, lane: 3 },
          { time: 38 * beatInterval, lane: 2 },
          { time: 39 * beatInterval, lane: 2 },
          { time: 40 * beatInterval, lane: 3 },
          { time: 41 * beatInterval, lane: 3 },
          { time: 42 * beatInterval, lane: 2 },
          { time: 43 * beatInterval, lane: 2 },
          { time: 44 * beatInterval, lane: 3 },
          { time: 45 * beatInterval, lane: 3 },
          { time: 46 * beatInterval, lane: 2 },
          { time: 47 * beatInterval, lane: 2 },
          { time: 48 * beatInterval, lane: 3 },
          { time: 48.5 * beatInterval, lane: 2 },
          { time: 49 * beatInterval, lane: 1 },
          { time: 49.5 * beatInterval, lane: 0 },
          { time: 50 * beatInterval, lane: 2 },
          { time: 50.5 * beatInterval, lane: 1 },
          { time: 51 * beatInterval, lane: 2 },
          { time: 51.5 * beatInterval, lane: 3 },
          { time: 52 * beatInterval, lane: 2 },
          { time: 52.5 * beatInterval, lane: 3 },
          { time: 53 * beatInterval, lane: 2 },
          { time: 53.5 * beatInterval, lane: 3 },
          { time: 54 * beatInterval, lane: 2 },
          { time: 54.5 * beatInterval, lane: 3 },
          { time: 55 * beatInterval, lane: 2 },
          { time: 55.5 * beatInterval, lane: 1 },
          { time: 56 * beatInterval, lane: 0 },
          { time: 56.5 * beatInterval, lane: 2 },
          { time: 57 * beatInterval, lane: 3 },
          { time: 57.5 * beatInterval, lane: 2 },
          { time: 58 * beatInterval, lane: 1 },
          { time: 58.5 * beatInterval, lane: 0 },
          { time: 59 * beatInterval, lane: 1 },
          { time: 59.5 * beatInterval, lane: 0 },
          { time: 60 * beatInterval, lane: 1 },
          { time: 60.5 * beatInterval, lane: 0 },
          { time: 61 * beatInterval, lane: 2 },
          { time: 61.5 * beatInterval, lane: 1 },
          { time: 62 * beatInterval, lane: 2 },
          { time: 62.5 * beatInterval, lane: 0 },
          { time: 63 * beatInterval, lane: 0 },
          { time: 64 * beatInterval, lane: 3 },
          { time: 65 * beatInterval, lane: 2 },
          { time: 66 * beatInterval, lane: 1 },
          { time: 67 * beatInterval, lane: 2 },
          { time: 68 * beatInterval, lane: 1 },
          { time: 69 * beatInterval, lane: 0 },
          { time: 70 * beatInterval, lane: 2 },
          { time: 71 * beatInterval, lane: 3 },
          { time: 72 * beatInterval, lane: 2 },
          { time: 73 * beatInterval, lane: 0 },
          { time: 74 * beatInterval, lane: 1 },
          { time: 75 * beatInterval, lane: 3 },
          { time: 76 * beatInterval, lane: 1 },
          { time: 77 * beatInterval, lane: 0 },
          { time: 78 * beatInterval, lane: 2 },
          { time: 79 * beatInterval, lane: 3 },
          { time: 80 * beatInterval, lane: 2 },
          { time: 81 * beatInterval, lane: 0 },
          { time: 82 * beatInterval, lane: 1 },
          { time: 83 * beatInterval, lane: 3 },
          { time: 84 * beatInterval, lane: 1 },
          { time: 85 * beatInterval, lane: 2 },
          { time: 86 * beatInterval, lane: 0 },
          { time: 87 * beatInterval, lane: 2 },
          { time: 88 * beatInterval, lane: 3 },
          { time: 89 * beatInterval, lane: 1 },
          { time: 90 * beatInterval, lane: 0 },
          { time: 91 * beatInterval, lane: 1 },
          { time: 92 * beatInterval, lane: 2 },
          { time: 93 * beatInterval, lane: 2 },
          { time: 94 * beatInterval, lane: 1 },
          { time: 95 * beatInterval, lane: 2 },
          { time: 96 * beatInterval, lane: 0 },
          { time: 97 * beatInterval, lane: 0 },
          { time: 98 * beatInterval, lane: 3 },
          { time: 98.5 * beatInterval, lane: 3 },
          { time: 99 * beatInterval, lane: 2 },
          { time: 99.5 * beatInterval, lane: 2 },
          { time: 100 * beatInterval, lane: 1 },
          { time: 100.5 * beatInterval, lane: 1 },
          { time: 101 * beatInterval, lane: 2 },
          { time: 101.5 * beatInterval, lane: 2 },
          { time: 102 * beatInterval, lane: 1 },
          { time: 102.5 * beatInterval, lane: 1 },
          { time: 103 * beatInterval, lane: 0 },
          { time: 103.5 * beatInterval, lane: 0 },
          { time: 104 * beatInterval, lane: 2 },
          { time: 104.5 * beatInterval, lane: 2 },
          { time: 105 * beatInterval, lane: 3 },
          { time: 105.5 * beatInterval, lane: 3 },
          { time: 106 * beatInterval, lane: 2 },
          { time: 106.5 * beatInterval, lane: 2 },
          { time: 107 * beatInterval, lane: 0 },
          { time: 107.5 * beatInterval, lane: 0 },
          { time: 108 * beatInterval, lane: 1 },
          { time: 108.5 * beatInterval, lane: 1 },
          { time: 109 * beatInterval, lane: 3 },
          { time: 109.5 * beatInterval, lane: 3 },
          { time: 110 * beatInterval, lane: 1 },
          { time: 110.5 * beatInterval, lane: 1 },
          { time: 111 * beatInterval, lane: 0 },
          { time: 111.5 * beatInterval, lane: 0 },
          { time: 112 * beatInterval, lane: 2 },
          { time: 112.5 * beatInterval, lane: 2 },
          { time: 113 * beatInterval, lane: 3 },
          { time: 113.5 * beatInterval, lane: 3 },
          { time: 114 * beatInterval, lane: 2 },
          { time: 114.5 * beatInterval, lane: 2 },
          { time: 115 * beatInterval, lane: 0 },
          { time: 115.5 * beatInterval, lane: 0 },
          { time: 116 * beatInterval, lane: 1 },
          { time: 116.5 * beatInterval, lane: 1 },
          { time: 117 * beatInterval, lane: 3 },
          { time: 117.5 * beatInterval, lane: 3 },
          { time: 118 * beatInterval, lane: 1 },
          { time: 118.5 * beatInterval, lane: 1 },
          { time: 119 * beatInterval, lane: 2 },
          { time: 119.5 * beatInterval, lane: 2 },
          { time: 120 * beatInterval, lane: 0 },
          { time: 120.5 * beatInterval, lane: 0 },
          { time: 121 * beatInterval, lane: 2 },
          { time: 121.5 * beatInterval, lane: 2 },
          { time: 122 * beatInterval, lane: 3 },
          { time: 122.5 * beatInterval, lane: 3 },
          { time: 123 * beatInterval, lane: 1 },
          { time: 123.5 * beatInterval, lane: 1 },
          { time: 124 * beatInterval, lane: 0 },
          { time: 124.5 * beatInterval, lane: 0 },
          { time: 125 * beatInterval, lane: 1 },
          { time: 125.5 * beatInterval, lane: 1 },
          { time: 126 * beatInterval, lane: 2 },
          { time: 126.5 * beatInterval, lane: 2 },
          { time: 127 * beatInterval, lane: 2 },
          { time: 128 * beatInterval, lane: 1 },
          { time: 129 * beatInterval, lane: 2 },
          { time: 130 * beatInterval, lane: 0 },
          { time: 130.5 * beatInterval, lane: 2 },
          { time: 131 * beatInterval, lane: 1 },
          { time: 131.5 * beatInterval, lane: 0 },
          { time: 132 * beatInterval, lane: 0 },
          { time: 132.5 * beatInterval, lane: 1 },
          { time: 133 * beatInterval, lane: 2 },
          { time: 133.5 * beatInterval, lane: 3 },
          { time: 134 * beatInterval, lane: 2 },
          { time: 134.5 * beatInterval, lane: 1 },
          { time: 135 * beatInterval, lane: 0 },
          { time: 135.5 * beatInterval, lane: 1 },
          { time: 136 * beatInterval, lane: 2 },
          { time: 136.5 * beatInterval, lane: 3 },
          { time: 137 * beatInterval, lane: 2 },
          { time: 137.5 * beatInterval, lane: 1 },
          { time: 138 * beatInterval, lane: 0 },
          { time: 138.5 * beatInterval, lane: 1 },
          { time: 139 * beatInterval, lane: 2 },
          { time: 139.5 * beatInterval, lane: 3 },
          { time: 140 * beatInterval, lane: 2 },
          { time: 140.5 * beatInterval, lane: 1 },
          { time: 141 * beatInterval, lane: 0 },
          { time: 141.5 * beatInterval, lane: 1 },
          { time: 142 * beatInterval, lane: 2 },
          { time: 142.5 * beatInterval, lane: 3 },
          { time: 143 * beatInterval, lane: 2 },
          { time: 143.5 * beatInterval, lane: 1 },
          { time: 144 * beatInterval, lane: 0 },
          { time: 144.5 * beatInterval, lane: 1 },
          { time: 145 * beatInterval, lane: 2 },
          { time: 145.5 * beatInterval, lane: 3 },
          { time: 146 * beatInterval, lane: 2 },
          { time: 146.5 * beatInterval, lane: 1 },
          { time: 147 * beatInterval, lane: 0 },
          { time: 147.5 * beatInterval, lane: 1 },
          { time: 148 * beatInterval, lane: 2 },
          { time: 148.5 * beatInterval, lane: 3 },
          { time: 149 * beatInterval, lane: 2 },
          { time: 149.5 * beatInterval, lane: 1 },
          { time: 150 * beatInterval, lane: 0 },
          { time: 150.5 * beatInterval, lane: 1 },
          { time: 151 * beatInterval, lane: 2 },
          { time: 151.5 * beatInterval, lane: 3 },
          { time: 152 * beatInterval, lane: 2 },
          { time: 152.5 * beatInterval, lane: 1 },
          { time: 153 * beatInterval, lane: 0 },
          { time: 153.5 * beatInterval, lane: 1 },
          { time: 154 * beatInterval, lane: 2 },
          { time: 154.5 * beatInterval, lane: 3 },
          { time: 155 * beatInterval, lane: 2 },
          { time: 155.5 * beatInterval, lane: 1 },
          { time: 156 * beatInterval, lane: 0 },
          { time: 156.5 * beatInterval, lane: 1 },
          { time: 157 * beatInterval, lane: 2 },
          { time: 157.5 * beatInterval, lane: 3 },
          { time: 158 * beatInterval, lane: 2 },
          { time: 158.5 * beatInterval, lane: 1 },
          { time: 159 * beatInterval, lane: 0 },
          { time: 159.5 * beatInterval, lane: 1 },
          { time: 160 * beatInterval, lane: 1 },
          { time: 162 * beatInterval, lane: 3 },
          { time: 162.1 * beatInterval, lane: 3 },
          { time: 162.2 * beatInterval, lane: 3 },
          { time: 162.3 * beatInterval, lane: 3 },
          { time: 163 * beatInterval, lane: 0 },
          { time: 163.4 * beatInterval, lane: 1 },
          { time: 163.8 * beatInterval, lane: 2 },
          { time: 164.2 * beatInterval, lane: 0 },
          { time: 164.6 * beatInterval, lane: 3 },
          { time: 165 * beatInterval, lane: 2 },
          { time: 166 * beatInterval, lane: 0 },
          { time: 166.1 * beatInterval, lane: 0 },
          { time: 166.2 * beatInterval, lane: 0 },
          { time: 166.3 * beatInterval, lane: 0 },
          { time: 167 * beatInterval, lane: 3 },
          { time: 167.4 * beatInterval, lane: 0 },
          { time: 167.8 * beatInterval, lane: 1 },
          { time: 168.2 * beatInterval, lane: 0 },
          { time: 168.6 * beatInterval, lane: 2 },
          { time: 169 * beatInterval, lane: 1 },
          { time: 170 * beatInterval, lane: 2 },
          { time: 170.1 * beatInterval, lane: 2 },
          { time: 170.2 * beatInterval, lane: 2 },
          { time: 170.3 * beatInterval, lane: 2 },
          { time: 171 * beatInterval, lane: 3 },
          { time: 171.4 * beatInterval, lane: 0 },
          { time: 172 * beatInterval, lane: 3 },
          { time: 174 * beatInterval, lane: 1 },
          { time: 174.1 * beatInterval, lane: 1 },
          { time: 174.2 * beatInterval, lane: 1 },
          { time: 174.3 * beatInterval, lane: 1 },
          { time: 175 * beatInterval, lane: 3 },
          { time: 175.4 * beatInterval, lane: 0 },
          { time: 175.8 * beatInterval, lane: 1 },
          { time: 176.2 * beatInterval, lane: 0 },
          { time: 176.6 * beatInterval, lane: 2 },
          { time: 177 * beatInterval, lane: 1 },
          { time: 178 * beatInterval, lane: 2 },
          { time: 178.1 * beatInterval, lane: 2 },
          { time: 178.2 * beatInterval, lane: 2 },
          { time: 178.3 * beatInterval, lane: 2 },
          { time: 179 * beatInterval, lane: 3 },
          { time: 179.4 * beatInterval, lane: 0 },
          { time: 179.8 * beatInterval, lane: 1 },
          { time: 180.2 * beatInterval, lane: 0 },
          { time: 180.6 * beatInterval, lane: 2 },
          { time: 181 * beatInterval, lane: 1 },
          { time: 182 * beatInterval, lane: 3 },
          { time: 182.1 * beatInterval, lane: 3 },
          { time: 182.2 * beatInterval, lane: 3 },
          { time: 182.3 * beatInterval, lane: 3 },
          { time: 183 * beatInterval, lane: 2 },
          { time: 183.4 * beatInterval, lane: 0 },
          { time: 183.8 * beatInterval, lane: 1 },
          { time: 184.2 * beatInterval, lane: 0 },
          { time: 184.6 * beatInterval, lane: 1 },
          { time: 185 * beatInterval, lane: 1 },
          { time: 186 * beatInterval, lane: 2 },
          { time: 186.1 * beatInterval, lane: 2 },
          { time: 186.2 * beatInterval, lane: 2 },
          { time: 186.3 * beatInterval, lane: 2 },
          { time: 187 * beatInterval, lane: 1 },
          { time: 187.4 * beatInterval, lane: 0 },
          { time: 187.8 * beatInterval, lane: 1 },
          { time: 188.2 * beatInterval, lane: 0 },
          { time: 188.6 * beatInterval, lane: 2 },
          { time: 189 * beatInterval, lane: 2 },
          { time: 190 * beatInterval, lane: 1 },
          { time: 190.1 * beatInterval, lane: 1 },
          { time: 190.2 * beatInterval, lane: 1 },
          { time: 190.3 * beatInterval, lane: 1 },
          { time: 192 * beatInterval, lane: 2 },
          { time: 192.2 * beatInterval, lane: 2 },
          { time: 192.4 * beatInterval, lane: 2 },
          { time: 192.6 * beatInterval, lane: 2 },
          { time: 192.8 * beatInterval, lane: 2 },
          { time: 193 * beatInterval, lane: 1 },
          { time: 194 * beatInterval, lane: 0 },
          { time: 195 * beatInterval, lane: 2 },
          { time: 196 * beatInterval, lane: 3 },
          { time: 197 * beatInterval, lane: 2 },
          { time: 197.5 * beatInterval, lane: 1 },
          { time: 198 * beatInterval, lane: 2 },
          { time: 199 * beatInterval, lane: 1 },
          { time: 200 * beatInterval, lane: 0 },
          { time: 201 * beatInterval, lane: 1 },
          { time: 201.5 * beatInterval, lane: 2 },
          { time: 202 * beatInterval, lane: 0 },
          { time: 203 * beatInterval, lane: 2 },
          { time: 204 * beatInterval, lane: 3 },
          { time: 205 * beatInterval, lane: 2 },
          { time: 205.5 * beatInterval, lane: 1 },
          { time: 206 * beatInterval, lane: 0 },
          { time: 207 * beatInterval, lane: 1 },
          { time: 208 * beatInterval, lane: 3 },
          { time: 208.5 * beatInterval, lane: 2 },
          { time: 209 * beatInterval, lane: 1 },
          { time: 210 * beatInterval, lane: 2 },
          { time: 211 * beatInterval, lane: 0 },
          { time: 211.5 * beatInterval, lane: 1 },
          { time: 212 * beatInterval, lane: 2 },
          { time: 213 * beatInterval, lane: 3 },
          { time: 214 * beatInterval, lane: 1 },
          { time: 214.5 * beatInterval, lane: 3 },
          { time: 215 * beatInterval, lane: 0 },
          { time: 216 * beatInterval, lane: 1 },
          { time: 217 * beatInterval, lane: 2 },
          { time: 218 * beatInterval, lane: 2 },
          { time: 218.5 * beatInterval, lane: 3 },
          { time: 219 * beatInterval, lane: 1 },
          { time: 220 * beatInterval, lane: 2 },
          { time: 221 * beatInterval, lane: 0 },
          { time: 222 * beatInterval, lane: 0 },
          { time: 222.5 * beatInterval, lane: 1 },
          { time: 223 * beatInterval, lane: 3 },
          { time: 224 * beatInterval, lane: 3 },
          { time: 225 * beatInterval, lane: 2 },
          { time: 226 * beatInterval, lane: 1 },
          { time: 226.5 * beatInterval, lane: 1 },
          { time: 227 * beatInterval, lane: 0 },
          { time: 227.5 * beatInterval, lane: 0 },
          { time: 228 * beatInterval, lane: 2 },
          { time: 228.5 * beatInterval, lane: 2 },
          { time: 229 * beatInterval, lane: 3 },
          { time: 229.5 * beatInterval, lane: 3 },
          { time: 230 * beatInterval, lane: 2 },
          { time: 230.5 * beatInterval, lane: 1 },
          { time: 231 * beatInterval, lane: 2 },
          { time: 231.5 * beatInterval, lane: 2 },
          { time: 232 * beatInterval, lane: 1 },
          { time: 232.5 * beatInterval, lane: 1 },
          { time: 233 * beatInterval, lane: 0 },
          { time: 233.5 * beatInterval, lane: 0 },
          { time: 234 * beatInterval, lane: 1 },
          { time: 234.5 * beatInterval, lane: 2 },
          { time: 235 * beatInterval, lane: 0 },
          { time: 235.5 * beatInterval, lane: 0 },
          { time: 236 * beatInterval, lane: 2 },
          { time: 236.5 * beatInterval, lane: 2 },
          { time: 237 * beatInterval, lane: 3 },
          { time: 237.5 * beatInterval, lane: 3 },
          { time: 238 * beatInterval, lane: 2 },
          { time: 238.5 * beatInterval, lane: 1 },
          { time: 239 * beatInterval, lane: 0 },
          { time: 239.5 * beatInterval, lane: 0 },
          { time: 240 * beatInterval, lane: 1 },
          { time: 240.5 * beatInterval, lane: 1 },
          { time: 241 * beatInterval, lane: 3 },
          { time: 241.5 * beatInterval, lane: 2 },
          { time: 242 * beatInterval, lane: 1 },
          { time: 242.5 * beatInterval, lane: 1 },
          { time: 243 * beatInterval, lane: 2 },
          { time: 243.5 * beatInterval, lane: 2 },
          { time: 244 * beatInterval, lane: 0 },
          { time: 244.5 * beatInterval, lane: 0 },
          { time: 245 * beatInterval, lane: 2 },
          { time: 245.5 * beatInterval, lane: 1 },
          { time: 246 * beatInterval, lane: 2 },
          { time: 246.5 * beatInterval, lane: 2 },
          { time: 247 * beatInterval, lane: 3 },
          { time: 247.5 * beatInterval, lane: 3 },
          { time: 248 * beatInterval, lane: 1 },
          { time: 248.5 * beatInterval, lane: 3 },
          { time: 249 * beatInterval, lane: 0 },
          { time: 249.5 * beatInterval, lane: 0 },
          { time: 250 * beatInterval, lane: 1 },
          { time: 250.5 * beatInterval, lane: 1 },
          { time: 251 * beatInterval, lane: 2 },
          { time: 251.5 * beatInterval, lane: 2 },
          { time: 252 * beatInterval, lane: 0 },
          { time: 252.5 * beatInterval, lane: 3 },
          { time: 253 * beatInterval, lane: 1 },
          { time: 253.5 * beatInterval, lane: 1 },
          { time: 254 * beatInterval, lane: 2 },
          { time: 254.5 * beatInterval, lane: 2 },
          { time: 255 * beatInterval, lane: 0 },
          { time: 255.2 * beatInterval, lane: 0 },
          { time: 255.4 * beatInterval, lane: 0 },
          { time: 255.6 * beatInterval, lane: 0 },
          { time: 255.8 * beatInterval, lane: 0 },
          { time: 256 * beatInterval, lane: 0 },
          { time: 256.2 * beatInterval, lane: 0 },
          { time: 256.4 * beatInterval, lane: 0 },
          { time: 256.6 * beatInterval, lane: 0 },
          { time: 256.8 * beatInterval, lane: 0 },
          { time: 257 * beatInterval, lane: 3 },
        //FIGHT!
          { time: 258 * beatInterval, lane: 0 },
          { time: 258.5 * beatInterval, lane: 2 },
          { time: 259 * beatInterval, lane: 1 },
          { time: 259.5 * beatInterval, lane: 2 },
          { time: 260 * beatInterval, lane: 1 },
          { time: 260.5 * beatInterval, lane: 2 },
          { time: 261 * beatInterval, lane: 1 },
          { time: 261.5 * beatInterval, lane: 2 },
          { time: 262 * beatInterval, lane: 3 },
          { time: 262.5 * beatInterval, lane: 2 },
          { time: 263 * beatInterval, lane: 3 },
          { time: 263.5 * beatInterval, lane: 2 },
          { time: 264 * beatInterval, lane: 3 },
          { time: 264.5 * beatInterval, lane: 2 },
          { time: 265 * beatInterval, lane: 3 },
          { time: 265.5 * beatInterval, lane: 2 },
          { time: 266 * beatInterval, lane: 0 },
          { time: 266.5 * beatInterval, lane: 1 },
          { time: 267 * beatInterval, lane: 0 },
          { time: 267.5 * beatInterval, lane: 1 },
          { time: 268 * beatInterval, lane: 0 },
          { time: 268.5 * beatInterval, lane: 1 },
          { time: 269 * beatInterval, lane: 0 },
          { time: 269.5 * beatInterval, lane: 1 },
          { time: 270 * beatInterval, lane: 0 },
          { time: 270.5 * beatInterval, lane: 2 },
          { time: 271 * beatInterval, lane: 1 },
          { time: 271.5 * beatInterval, lane: 1 },
          { time: 272 * beatInterval, lane: 2 },
          { time: 272.5 * beatInterval, lane: 3 },
          { time: 273 * beatInterval, lane: 2 },
          { time: 273.5 * beatInterval, lane: 0 },
          { time: 274 * beatInterval, lane: 1 },
          { time: 274.5 * beatInterval, lane: 0 },
          { time: 275 * beatInterval, lane: 1 },
          { time: 275.5 * beatInterval, lane: 0 },
          { time: 276 * beatInterval, lane: 1 },
          { time: 276.5 * beatInterval, lane: 0 },
          { time: 277 * beatInterval, lane: 1 },
          { time: 277.5 * beatInterval, lane: 0 },
          { time: 278 * beatInterval, lane: 2 },
          { time: 278.5 * beatInterval, lane: 3 },
          { time: 279 * beatInterval, lane: 2 },
          { time: 279.5 * beatInterval, lane: 3 },
          { time: 280 * beatInterval, lane: 2 },
          { time: 280.5 * beatInterval, lane: 3 },
          { time: 281 * beatInterval, lane: 2 },
          { time: 281.5 * beatInterval, lane: 3 },
          { time: 282 * beatInterval, lane: 2 },
          { time: 282.5 * beatInterval, lane: 3 },
          { time: 283 * beatInterval, lane: 2 },
          { time: 283.5 * beatInterval, lane: 3 },
          { time: 284 * beatInterval, lane: 1 },
          { time: 284.5 * beatInterval, lane: 0 },
          { time: 285 * beatInterval, lane: 1 },
          { time: 285.5 * beatInterval, lane: 2 },
          { time: 286 * beatInterval, lane: 0 },
          { time: 286.5 * beatInterval, lane: 2 },
          { time: 287 * beatInterval, lane: 1 },
          { time: 287.5 * beatInterval, lane: 0 },
          { time: 288 * beatInterval, lane: 1 },
          { time: 288.5 * beatInterval, lane: 2 },
          { time: 289 * beatInterval, lane: 3 },
          { time: 289.5 * beatInterval, lane: 3 },
          { time: 290 * beatInterval, lane: 0 },
          { time: 290.5 * beatInterval, lane: 2 },
          { time: 291 * beatInterval, lane: 1 },
          { time: 291.5 * beatInterval, lane: 2 },
          { time: 292 * beatInterval, lane: 1 },
          { time: 292.5 * beatInterval, lane: 2 },
          { time: 293 * beatInterval, lane: 1 },
          { time: 293.5 * beatInterval, lane: 2 },
          { time: 294 * beatInterval, lane: 3 },
          { time: 294.5 * beatInterval, lane: 2 },
          { time: 295 * beatInterval, lane: 3 },
          { time: 295.5 * beatInterval, lane: 2 },
          { time: 296 * beatInterval, lane: 3 },
          { time: 296.5 * beatInterval, lane: 2 },
          { time: 297 * beatInterval, lane: 3 },
          { time: 297.5 * beatInterval, lane: 2 },
          { time: 298 * beatInterval, lane: 0 },
          { time: 298.5 * beatInterval, lane: 1 },
          { time: 299 * beatInterval, lane: 0 },
          { time: 299.5 * beatInterval, lane: 1 },
          { time: 300 * beatInterval, lane: 0 },
          { time: 300.5 * beatInterval, lane: 1 },
          { time: 301 * beatInterval, lane: 0 },
          { time: 301.5 * beatInterval, lane: 1 },
          { time: 302 * beatInterval, lane: 0 },
          { time: 302.5 * beatInterval, lane: 2 },
          { time: 303 * beatInterval, lane: 1 },
          { time: 303.5 * beatInterval, lane: 1 },
          { time: 304 * beatInterval, lane: 2 },
          { time: 304.5 * beatInterval, lane: 3 },
          { time: 305 * beatInterval, lane: 2 },
          { time: 305.5 * beatInterval, lane: 0 },
          { time: 306 * beatInterval, lane: 1 },
          { time: 306.5 * beatInterval, lane: 0 },
          { time: 307 * beatInterval, lane: 1 },
          { time: 307.5 * beatInterval, lane: 0 },
          { time: 308 * beatInterval, lane: 1 },
          { time: 308.5 * beatInterval, lane: 0 },
          { time: 309 * beatInterval, lane: 1 },
          { time: 309.5 * beatInterval, lane: 0 },
          { time: 310 * beatInterval, lane: 2 },
          { time: 310.5 * beatInterval, lane: 3 },
          { time: 311 * beatInterval, lane: 2 },
          { time: 311.5 * beatInterval, lane: 3 },
          { time: 312 * beatInterval, lane: 2 },
          { time: 312.5 * beatInterval, lane: 3 },
          { time: 313 * beatInterval, lane: 2 },
          { time: 313.5 * beatInterval, lane: 3 },
          { time: 314 * beatInterval, lane: 2 },
          { time: 314.5 * beatInterval, lane: 3 },
          { time: 315 * beatInterval, lane: 2 },
          { time: 315.5 * beatInterval, lane: 3 },
          { time: 316 * beatInterval, lane: 1 },
          { time: 316.5 * beatInterval, lane: 0 },
          { time: 317 * beatInterval, lane: 1 },
          { time: 317.5 * beatInterval, lane: 2 },
          { time: 318 * beatInterval, lane: 0 },
          { time: 318.5 * beatInterval, lane: 2 },
          { time: 319 * beatInterval, lane: 1 },
          { time: 319.5 * beatInterval, lane: 0 },
          { time: 320 * beatInterval, lane: 1 },
          { time: 320.5 * beatInterval, lane: 2 },
          { time: 321 * beatInterval, lane: 3 },
          { time: 321.5 * beatInterval, lane: 3 },
            //interlude
          { time: 322 * beatInterval, lane: 3 },
          { time: 323 * beatInterval, lane: 1 },
          { time: 324 * beatInterval, lane: 3 },
          { time: 325 * beatInterval, lane: 0 },
          { time: 326 * beatInterval, lane: 2 },
          { time: 327 * beatInterval, lane: 3 },
          { time: 328 * beatInterval, lane: 3 },
          { time: 329 * beatInterval, lane: 1 },
          { time: 330 * beatInterval, lane: 2 },
          { time: 331 * beatInterval, lane: 3 },
          { time: 332 * beatInterval, lane: 2 },
          { time: 333 * beatInterval, lane: 0 },
          { time: 334 * beatInterval, lane: 3 },
          { time: 335 * beatInterval, lane: 1 },
          { time: 336 * beatInterval, lane: 2 },
          { time: 337 * beatInterval, lane: 0 },
          { time: 338 * beatInterval, lane: 3 },
          { time: 339 * beatInterval, lane: 1 },
          { time: 340 * beatInterval, lane: 2 },
          { time: 341 * beatInterval, lane: 1 },
          { time: 342 * beatInterval, lane: 2 },
          { time: 343 * beatInterval, lane: 1 },
          { time: 344 * beatInterval, lane: 3 },
          { time: 345 * beatInterval, lane: 3 },
          { time: 346 * beatInterval, lane: 2 },
          { time: 347 * beatInterval, lane: 2 },
          { time: 348 * beatInterval, lane: 3 },
          { time: 349 * beatInterval, lane: 0 },
          { time: 350 * beatInterval, lane: 2 },
          { time: 351 * beatInterval, lane: 1 },
          { time: 352 * beatInterval, lane: 3 },
          { time: 353 * beatInterval, lane: 3 },
          { time: 354 * beatInterval, lane: 2 },
          { time: 355 * beatInterval, lane: 1 },
          { time: 356 * beatInterval, lane: 0 },
          { time: 357 * beatInterval, lane: 2 },
          { time: 358 * beatInterval, lane: 3 },
          { time: 359 * beatInterval, lane: 2 },
          { time: 360 * beatInterval, lane: 0 },
          { time: 361 * beatInterval, lane: 1 },
          { time: 362 * beatInterval, lane: 3 },
          { time: 363 * beatInterval, lane: 1 },
          { time: 364 * beatInterval, lane: 0 },
          { time: 365 * beatInterval, lane: 2 },
          { time: 366 * beatInterval, lane: 3 },
          { time: 367 * beatInterval, lane: 2 },
          { time: 368 * beatInterval, lane: 0 },
          { time: 369 * beatInterval, lane: 1 },
          { time: 370 * beatInterval, lane: 3 },
          { time: 371 * beatInterval, lane: 1 },
          { time: 372 * beatInterval, lane: 2 },
          { time: 373 * beatInterval, lane: 0 },
          { time: 374 * beatInterval, lane: 2 },
          { time: 375 * beatInterval, lane: 3 },
          { time: 376 * beatInterval, lane: 1 },
          { time: 377 * beatInterval, lane: 0 },
          { time: 378 * beatInterval, lane: 1 },
          { time: 379 * beatInterval, lane: 2 },
          { time: 380 * beatInterval, lane: 2 },
          { time: 381 * beatInterval, lane: 1 },
          { time: 382 * beatInterval, lane: 2 },
          { time: 383 * beatInterval, lane: 0 },
          { time: 384 * beatInterval, lane: 0 },
          { time: 385 * beatInterval, lane: 3 },
          { time: 385.5 * beatInterval, lane: 3 },
          { time: 386 * beatInterval, lane: 2 },
          { time: 386.5 * beatInterval, lane: 2 },
          { time: 387 * beatInterval, lane: 1 },
          { time: 387.5 * beatInterval, lane: 1 },
          { time: 388 * beatInterval, lane: 2 },
          { time: 388.5 * beatInterval, lane: 2 },
          { time: 389 * beatInterval, lane: 1 },
          { time: 389.5 * beatInterval, lane: 1 },
          { time: 390 * beatInterval, lane: 0 },
          { time: 390.5 * beatInterval, lane: 0 },
          { time: 391 * beatInterval, lane: 2 },
          { time: 391.5 * beatInterval, lane: 2 },
          { time: 392 * beatInterval, lane: 3 },
          { time: 392.5 * beatInterval, lane: 3 },
          { time: 393 * beatInterval, lane: 2 },
          { time: 393.5 * beatInterval, lane: 2 },
          { time: 394 * beatInterval, lane: 0 },
          { time: 394.5 * beatInterval, lane: 0 },
          { time: 395 * beatInterval, lane: 1 },
          { time: 395.5 * beatInterval, lane: 1 },
          { time: 396 * beatInterval, lane: 3 },
          { time: 396.5 * beatInterval, lane: 3 },
          { time: 397 * beatInterval, lane: 1 },
          { time: 397.5 * beatInterval, lane: 1 },
          { time: 398 * beatInterval, lane: 0 },
          { time: 398.5 * beatInterval, lane: 0 },
          { time: 399 * beatInterval, lane: 2 },
          { time: 399.5 * beatInterval, lane: 2 },
          { time: 400 * beatInterval, lane: 3 },
          { time: 400.5 * beatInterval, lane: 3 },
          { time: 401 * beatInterval, lane: 2 },
          { time: 401.5 * beatInterval, lane: 2 },
          { time: 402 * beatInterval, lane: 0 },
          { time: 402.5 * beatInterval, lane: 0 },
          { time: 403 * beatInterval, lane: 1 },
          { time: 403.5 * beatInterval, lane: 1 },
          { time: 404 * beatInterval, lane: 3 },
          { time: 404.5 * beatInterval, lane: 3 },
          { time: 405 * beatInterval, lane: 1 },
          { time: 405.5 * beatInterval, lane: 1 },
          { time: 406 * beatInterval, lane: 2 },
          { time: 406.5 * beatInterval, lane: 2 },
          { time: 407 * beatInterval, lane: 0 },
          { time: 407.5 * beatInterval, lane: 0 },
          { time: 408 * beatInterval, lane: 2 },
          { time: 408.5 * beatInterval, lane: 2 },
          { time: 409 * beatInterval, lane: 3 },
          { time: 409.5 * beatInterval, lane: 3 },
          { time: 410 * beatInterval, lane: 1 },
          { time: 410.5 * beatInterval, lane: 1 },
          { time: 411 * beatInterval, lane: 0 },
          { time: 411.5 * beatInterval, lane: 0 },
          { time: 412 * beatInterval, lane: 1 },
          { time: 412.5 * beatInterval, lane: 1 },
          { time: 413 * beatInterval, lane: 2 },
          { time: 413.5 * beatInterval, lane: 2 },
          { time: 414 * beatInterval, lane: 2 },
          { time: 415 * beatInterval, lane: 1 },
          { time: 416 * beatInterval, lane: 2 },
          { time: 417 * beatInterval, lane: 0 },
          { time: 417.5 * beatInterval, lane: 2 },
          { time: 418 * beatInterval, lane: 1 },
          { time: 418.5 * beatInterval, lane: 0 },
          { time: 419 * beatInterval, lane: 0 },
          { time: 419.5 * beatInterval, lane: 1 },
          { time: 420 * beatInterval, lane: 2 },
          { time: 420.5 * beatInterval, lane: 3 },
          { time: 421 * beatInterval, lane: 2 },
          { time: 421.5 * beatInterval, lane: 1 },
          { time: 422 * beatInterval, lane: 0 },
          { time: 422.5 * beatInterval, lane: 1 },
          { time: 423 * beatInterval, lane: 2 },
          { time: 423.5 * beatInterval, lane: 3 },
          { time: 424 * beatInterval, lane: 2 },
          { time: 424.5 * beatInterval, lane: 1 },
          { time: 425 * beatInterval, lane: 0 },
          { time: 425.5 * beatInterval, lane: 1 },
          { time: 426 * beatInterval, lane: 2 },
          { time: 426.5 * beatInterval, lane: 3 },
          { time: 427 * beatInterval, lane: 2 },
          { time: 427.5 * beatInterval, lane: 1 },
          { time: 428 * beatInterval, lane: 0 },
          { time: 428.5 * beatInterval, lane: 1 },
          { time: 429 * beatInterval, lane: 2 },
          { time: 429.5 * beatInterval, lane: 3 },
          { time: 430 * beatInterval, lane: 2 },
          { time: 430.5 * beatInterval, lane: 1 },
          { time: 431 * beatInterval, lane: 0 },
          { time: 431.5 * beatInterval, lane: 1 },
          { time: 432 * beatInterval, lane: 2 },
          { time: 432.5 * beatInterval, lane: 3 },
          { time: 433 * beatInterval, lane: 2 },
          { time: 433.5 * beatInterval, lane: 1 },
          { time: 434 * beatInterval, lane: 0 },
          { time: 434.5 * beatInterval, lane: 1 },
          { time: 435 * beatInterval, lane: 2 },
          { time: 435.5 * beatInterval, lane: 3 },
          { time: 436 * beatInterval, lane: 2 },
          { time: 436.5 * beatInterval, lane: 1 },
          { time: 437 * beatInterval, lane: 0 },
          { time: 437.5 * beatInterval, lane: 1 },
          { time: 438 * beatInterval, lane: 2 },
          { time: 438.5 * beatInterval, lane: 3 },
          { time: 439 * beatInterval, lane: 2 },
          { time: 439.5 * beatInterval, lane: 1 },
          { time: 440 * beatInterval, lane: 0 },
          { time: 440.5 * beatInterval, lane: 1 },
          { time: 441 * beatInterval, lane: 2 },
          { time: 441.5 * beatInterval, lane: 3 },
          { time: 442 * beatInterval, lane: 2 },
          { time: 442.5 * beatInterval, lane: 1 },
          { time: 443 * beatInterval, lane: 0 },
          { time: 443.5 * beatInterval, lane: 1 },
          { time: 444 * beatInterval, lane: 2 },
          { time: 444.5 * beatInterval, lane: 3 },
          { time: 445 * beatInterval, lane: 2 },
          { time: 445.5 * beatInterval, lane: 1 },
          { time: 446 * beatInterval, lane: 0 },
            //BUGHERE
          { time: 449 * beatInterval, lane: 3 },
          { time: 449.1 * beatInterval, lane: 3 },
          { time: 449.2 * beatInterval, lane: 3 },
          { time: 449.3 * beatInterval, lane: 3 },
          { time: 450 * beatInterval, lane: 0 },
          { time: 450.4 * beatInterval, lane: 1 },
          { time: 450.8 * beatInterval, lane: 2 },
          { time: 451.2 * beatInterval, lane: 0 },
          { time: 451.6 * beatInterval, lane: 3 },
          { time: 452 * beatInterval, lane: 2 },
          { time: 453 * beatInterval, lane: 0 },
          { time: 453.1 * beatInterval, lane: 0 },
          { time: 453.2 * beatInterval, lane: 0 },
          { time: 453.3 * beatInterval, lane: 0 },
          { time: 454 * beatInterval, lane: 3 },
          { time: 454.4 * beatInterval, lane: 0 },
          { time: 454.8 * beatInterval, lane: 1 },
          { time: 455.2 * beatInterval, lane: 0 },
          { time: 455.6 * beatInterval, lane: 2 },
          { time: 456 * beatInterval, lane: 1 },
          { time: 457 * beatInterval, lane: 2 },
          { time: 457.1 * beatInterval, lane: 2 },
          { time: 457.2 * beatInterval, lane: 2 },
          { time: 457.3 * beatInterval, lane: 2 },
          { time: 458 * beatInterval, lane: 3 },
          { time: 459.4 * beatInterval, lane: 0 },
          { time: 461 * beatInterval, lane: 3 },
          { time: 462 * beatInterval, lane: 1 },
          { time: 462.1 * beatInterval, lane: 1 },
          { time: 462.2 * beatInterval, lane: 1 },
          { time: 462.3 * beatInterval, lane: 1 },
          { time: 463 * beatInterval, lane: 3 },
          { time: 463.4 * beatInterval, lane: 0 },
          { time: 463.8 * beatInterval, lane: 1 },
          { time: 464.2 * beatInterval, lane: 0 },
          { time: 464.6 * beatInterval, lane: 2 },
          { time: 465 * beatInterval, lane: 1 },
          { time: 466 * beatInterval, lane: 2 },
          { time: 466.1 * beatInterval, lane: 2 },
          { time: 466.2 * beatInterval, lane: 2 },
          { time: 466.3 * beatInterval, lane: 2 },
          { time: 467 * beatInterval, lane: 3 },
          { time: 467.4 * beatInterval, lane: 0 },
          { time: 467.8 * beatInterval, lane: 1 },
          { time: 468.2 * beatInterval, lane: 0 },
          { time: 468.6 * beatInterval, lane: 2 },
          { time: 469 * beatInterval, lane: 1 },
          { time: 470 * beatInterval, lane: 3 },
          { time: 470.1 * beatInterval, lane: 3 },
          { time: 470.2 * beatInterval, lane: 3 },
          { time: 470.3 * beatInterval, lane: 3 },
          { time: 471 * beatInterval, lane: 2 },
          { time: 471.4 * beatInterval, lane: 0 },
          { time: 471.8 * beatInterval, lane: 1 },
          { time: 472.2 * beatInterval, lane: 0 },
          { time: 472.6 * beatInterval, lane: 1 },
          { time: 473 * beatInterval, lane: 1 },
          { time: 474 * beatInterval, lane: 2 },
          { time: 474.1 * beatInterval, lane: 2 },
          { time: 474.2 * beatInterval, lane: 2 },
          { time: 474.3 * beatInterval, lane: 2 },
          { time: 475 * beatInterval, lane: 1 },
          { time: 475.4 * beatInterval, lane: 0 },
          { time: 475.8 * beatInterval, lane: 1 },
          { time: 476.2 * beatInterval, lane: 0 },
          { time: 476.6 * beatInterval, lane: 2 },
          { time: 477 * beatInterval, lane: 2 },
          { time: 478 * beatInterval, lane: 1 },
          { time: 478.1 * beatInterval, lane: 1 },
          { time: 478.2 * beatInterval, lane: 1 },
          { time: 478.3 * beatInterval, lane: 1 },
          { time: 479 * beatInterval, lane: 2 },
          { time: 479.2 * beatInterval, lane: 2 },
          { time: 479.4 * beatInterval, lane: 2 },
          { time: 479.6 * beatInterval, lane: 2 },
          { time: 479.8 * beatInterval, lane: 2 },
          { time: 480 * beatInterval, lane: 1 },
          { time: 481 * beatInterval, lane: 0 },
          { time: 482 * beatInterval, lane: 2 },
          { time: 483 * beatInterval, lane: 3 },
          { time: 484 * beatInterval, lane: 2 },
          { time: 484.5 * beatInterval, lane: 1 },
          { time: 485 * beatInterval, lane: 2 },
          { time: 486 * beatInterval, lane: 1 },
          { time: 487 * beatInterval, lane: 0 },
          { time: 488 * beatInterval, lane: 1 },
          { time: 488.5 * beatInterval, lane: 2 },
          { time: 489 * beatInterval, lane: 0 },
          { time: 490 * beatInterval, lane: 2 },
          { time: 491 * beatInterval, lane: 3 },
          { time: 492 * beatInterval, lane: 2 },
          { time: 492.5 * beatInterval, lane: 1 },
          { time: 493 * beatInterval, lane: 0 },
          { time: 494 * beatInterval, lane: 1 },
          { time: 495 * beatInterval, lane: 3 },
          { time: 495.5 * beatInterval, lane: 2 },
          { time: 496 * beatInterval, lane: 1 },
          { time: 497 * beatInterval, lane: 2 },
          { time: 498 * beatInterval, lane: 0 },
          { time: 498.5 * beatInterval, lane: 1 },
          { time: 499 * beatInterval, lane: 2 },
          { time: 500 * beatInterval, lane: 3 },
          { time: 501 * beatInterval, lane: 1 },
          { time: 501.5 * beatInterval, lane: 3 },
          { time: 502 * beatInterval, lane: 0 },
          { time: 503 * beatInterval, lane: 1 },
          { time: 504 * beatInterval, lane: 2 },
          { time: 505 * beatInterval, lane: 2 },
          { time: 505.5 * beatInterval, lane: 3 },
          { time: 506 * beatInterval, lane: 1 },
          { time: 507 * beatInterval, lane: 2 },
          { time: 508 * beatInterval, lane: 0 },
          { time: 509 * beatInterval, lane: 0 },
          { time: 509.5 * beatInterval, lane: 1 },
          { time: 510 * beatInterval, lane: 3 },
          { time: 511 * beatInterval, lane: 3 },
          { time: 512 * beatInterval, lane: 2 },
          { time: 513 * beatInterval, lane: 1 },
          { time: 513.5 * beatInterval, lane: 1 },
          { time: 514 * beatInterval, lane: 0 },
          { time: 514.5 * beatInterval, lane: 0 },
          { time: 515 * beatInterval, lane: 2 },
          { time: 515.5 * beatInterval, lane: 2 },
          { time: 516 * beatInterval, lane: 3 },
          { time: 516.5 * beatInterval, lane: 3 },
          { time: 517 * beatInterval, lane: 2 },
          { time: 517.5 * beatInterval, lane: 1 },
          { time: 518 * beatInterval, lane: 2 },
          { time: 518.5 * beatInterval, lane: 2 },
          { time: 519 * beatInterval, lane: 1 },
          { time: 519.5 * beatInterval, lane: 1 },
          { time: 520 * beatInterval, lane: 0 },
          { time: 520.5 * beatInterval, lane: 0 },
          { time: 521 * beatInterval, lane: 1 },
          { time: 521.5 * beatInterval, lane: 2 },
          { time: 522 * beatInterval, lane: 0 },
          { time: 522.5 * beatInterval, lane: 0 },
          { time: 523 * beatInterval, lane: 2 },
          { time: 523.5 * beatInterval, lane: 2 },
          { time: 524 * beatInterval, lane: 3 },
          { time: 524.5 * beatInterval, lane: 3 },
          { time: 525 * beatInterval, lane: 2 },
          { time: 525.5 * beatInterval, lane: 1 },
          { time: 526 * beatInterval, lane: 0 },
          { time: 526.5 * beatInterval, lane: 0 },
          { time: 527 * beatInterval, lane: 1 },
          { time: 527.5 * beatInterval, lane: 1 },
          { time: 528 * beatInterval, lane: 3 },
          { time: 528.5 * beatInterval, lane: 2 },
          { time: 529 * beatInterval, lane: 1 },
          { time: 529.5 * beatInterval, lane: 1 },
          { time: 530 * beatInterval, lane: 2 },
          { time: 530.5 * beatInterval, lane: 2 },
          { time: 531 * beatInterval, lane: 0 },
          { time: 531.5 * beatInterval, lane: 0 },
          { time: 532 * beatInterval, lane: 2 },
          { time: 532.5 * beatInterval, lane: 1 },
          { time: 533 * beatInterval, lane: 2 },
          { time: 533.5 * beatInterval, lane: 2 },
          { time: 534 * beatInterval, lane: 3 },
          { time: 534.5 * beatInterval, lane: 3 },
          { time: 535 * beatInterval, lane: 1 },
          { time: 535.5 * beatInterval, lane: 3 },
          { time: 536 * beatInterval, lane: 0 },
          { time: 536.5 * beatInterval, lane: 0 },
          { time: 537 * beatInterval, lane: 1 },
          { time: 537.5 * beatInterval, lane: 1 },
          { time: 538 * beatInterval, lane: 2 },
          { time: 538.5 * beatInterval, lane: 2 },
          { time: 539 * beatInterval, lane: 0 },
          { time: 539.5 * beatInterval, lane: 3 },
          { time: 540 * beatInterval, lane: 1 },
          { time: 540.5 * beatInterval, lane: 1 },
          { time: 541 * beatInterval, lane: 2 },
          { time: 541.5 * beatInterval, lane: 2 },
          { time: 542 * beatInterval, lane: 0 },
          { time: 542.2 * beatInterval, lane: 0 },
          { time: 542.4 * beatInterval, lane: 0 },
          { time: 542.6 * beatInterval, lane: 0 },
          { time: 542.8 * beatInterval, lane: 0 },
          { time: 543 * beatInterval, lane: 0 },
          { time: 543.2 * beatInterval, lane: 0 },
          { time: 543.4 * beatInterval, lane: 0 },
          { time: 543.6 * beatInterval, lane: 0 },
          { time: 543.8 * beatInterval, lane: 0 },
          { time: 544 * beatInterval, lane: 3 },
            //FIGHT!!
          { time: 545 * beatInterval, lane: 0 },
          { time: 545.5 * beatInterval, lane: 2 },
          { time: 546 * beatInterval, lane: 1 },
          { time: 546.5 * beatInterval, lane: 2 },
          { time: 547 * beatInterval, lane: 1 },
          { time: 547.5 * beatInterval, lane: 2 },
          { time: 548 * beatInterval, lane: 1 },
          { time: 548.5 * beatInterval, lane: 2 },
          { time: 549 * beatInterval, lane: 3 },
          { time: 549.5 * beatInterval, lane: 2 },
          { time: 550 * beatInterval, lane: 3 },
          { time: 550.5 * beatInterval, lane: 2 },
          { time: 551 * beatInterval, lane: 3 },
          { time: 551.5 * beatInterval, lane: 2 },
          { time: 552 * beatInterval, lane: 3 },
          { time: 552.5 * beatInterval, lane: 2 },
          { time: 553 * beatInterval, lane: 0 },
          { time: 553.5 * beatInterval, lane: 1 },
          { time: 554 * beatInterval, lane: 0 },
          { time: 554.5 * beatInterval, lane: 1 },
          { time: 555 * beatInterval, lane: 0 },
          { time: 555.5 * beatInterval, lane: 1 },
          { time: 556 * beatInterval, lane: 0 },
          { time: 556.5 * beatInterval, lane: 1 },
          { time: 557 * beatInterval, lane: 0 },
          { time: 557.5 * beatInterval, lane: 2 },
          { time: 558 * beatInterval, lane: 1 },
          { time: 558.5 * beatInterval, lane: 1 },
          { time: 559 * beatInterval, lane: 2 },
          { time: 559.5 * beatInterval, lane: 3 },
          { time: 560 * beatInterval, lane: 2 },
          { time: 560.5 * beatInterval, lane: 0 },
          { time: 561 * beatInterval, lane: 1 },
          { time: 561.5 * beatInterval, lane: 0 },
          { time: 562 * beatInterval, lane: 1 },
          { time: 562.5 * beatInterval, lane: 0 },
          { time: 563 * beatInterval, lane: 1 },
          { time: 563.5 * beatInterval, lane: 0 },
          { time: 564 * beatInterval, lane: 1 },
          { time: 564.5 * beatInterval, lane: 0 },
          { time: 565 * beatInterval, lane: 2 },
          { time: 565.5 * beatInterval, lane: 3 },
          { time: 566 * beatInterval, lane: 2 },
          { time: 566.5 * beatInterval, lane: 3 },
          { time: 567 * beatInterval, lane: 2 },
          { time: 567.5 * beatInterval, lane: 3 },
          { time: 568 * beatInterval, lane: 2 },
          { time: 568.5 * beatInterval, lane: 3 },
          { time: 569 * beatInterval, lane: 2 },
          { time: 569.5 * beatInterval, lane: 3 },
          { time: 570 * beatInterval, lane: 2 },
          { time: 570.5 * beatInterval, lane: 3 },
          { time: 571 * beatInterval, lane: 1 },
          { time: 571.5 * beatInterval, lane: 0 },
          { time: 572 * beatInterval, lane: 1 },
          { time: 572.5 * beatInterval, lane: 2 },
          { time: 573 * beatInterval, lane: 0 },
          { time: 573.5 * beatInterval, lane: 2 },
          { time: 574 * beatInterval, lane: 1 },
          { time: 574.5 * beatInterval, lane: 0 },
          { time: 575 * beatInterval, lane: 1 },
          { time: 575.5 * beatInterval, lane: 2 },
          { time: 576 * beatInterval, lane: 3 },
          { time: 576.5 * beatInterval, lane: 3 },
          { time: 577 * beatInterval, lane: 0 },
          { time: 577.5 * beatInterval, lane: 2 },
          { time: 578 * beatInterval, lane: 1 },
          { time: 578.5 * beatInterval, lane: 2 },
          { time: 579 * beatInterval, lane: 1 },
          { time: 579.5 * beatInterval, lane: 2 },
          { time: 580 * beatInterval, lane: 1 },
          { time: 580.5 * beatInterval, lane: 2 },
          { time: 581 * beatInterval, lane: 3 },
          { time: 581.5 * beatInterval, lane: 2 },
          { time: 582 * beatInterval, lane: 3 },
          { time: 582.5 * beatInterval, lane: 2 },
          { time: 583 * beatInterval, lane: 3 },
          { time: 583.5 * beatInterval, lane: 2 },
          { time: 584 * beatInterval, lane: 3 },
          { time: 584.5 * beatInterval, lane: 2 },
          { time: 585 * beatInterval, lane: 0 },
          { time: 585.5 * beatInterval, lane: 1 },
          { time: 586 * beatInterval, lane: 0 },
          { time: 586.5 * beatInterval, lane: 1 },
          { time: 587 * beatInterval, lane: 0 },
          { time: 587.5 * beatInterval, lane: 1 },
          { time: 588 * beatInterval, lane: 0 },
          { time: 588.5 * beatInterval, lane: 1 },
          { time: 589 * beatInterval, lane: 0 },
          { time: 589.5 * beatInterval, lane: 2 },
          { time: 590 * beatInterval, lane: 1 },
          { time: 590.5 * beatInterval, lane: 1 },
          { time: 591 * beatInterval, lane: 2 },
          { time: 591.5 * beatInterval, lane: 3 },
          { time: 592 * beatInterval, lane: 2 },
          { time: 592.5 * beatInterval, lane: 0 },
          { time: 593 * beatInterval, lane: 1 },
          { time: 593.5 * beatInterval, lane: 0 },
          { time: 594 * beatInterval, lane: 1 },
          { time: 594.5 * beatInterval, lane: 0 },
          { time: 595 * beatInterval, lane: 1 },
          { time: 595.5 * beatInterval, lane: 0 },
          { time: 596 * beatInterval, lane: 1 },
          { time: 596.5 * beatInterval, lane: 0 },
          { time: 597 * beatInterval, lane: 2 },
          { time: 597.5 * beatInterval, lane: 3 },
          { time: 598 * beatInterval, lane: 2 },
          { time: 598.5 * beatInterval, lane: 3 },
          { time: 599 * beatInterval, lane: 2 },
          { time: 599.5 * beatInterval, lane: 3 },
          { time: 600 * beatInterval, lane: 2 },
          { time: 600.5 * beatInterval, lane: 3 },
          { time: 601 * beatInterval, lane: 2 },
          { time: 601.5 * beatInterval, lane: 3 },
          { time: 602 * beatInterval, lane: 2 },
          { time: 602.5 * beatInterval, lane: 3 },
          { time: 603 * beatInterval, lane: 1 },
          { time: 603.5 * beatInterval, lane: 0 },
          { time: 604 * beatInterval, lane: 1 },
          { time: 604.5 * beatInterval, lane: 2 },
          { time: 605 * beatInterval, lane: 0 },
          { time: 605.5 * beatInterval, lane: 2 },
          { time: 606 * beatInterval, lane: 1 },
          { time: 606.5 * beatInterval, lane: 0 },
          { time: 607 * beatInterval, lane: 1 },
          { time: 607.5 * beatInterval, lane: 2 },
          { time: 608 * beatInterval, lane: 3 },
          { time: 608.5 * beatInterval, lane: 3 },
        //closing
          { time: 609 * beatInterval, lane: 0 },
          { time: 610 * beatInterval, lane: 1 },
          { time: 611 * beatInterval, lane: 0 },
          { time: 612 * beatInterval, lane: 0 },
          { time: 613 * beatInterval, lane: 1 },
          { time: 614 * beatInterval, lane: 1 },
          { time: 615 * beatInterval, lane: 0 },
          { time: 616 * beatInterval, lane: 0 },
          { time: 617 * beatInterval, lane: 1 },
          { time: 618 * beatInterval, lane: 0 },
          { time: 619 * beatInterval, lane: 1 },
          { time: 620 * beatInterval, lane: 1 },
          { time: 621 * beatInterval, lane: 0 },
          { time: 622 * beatInterval, lane: 0 },
          { time: 623 * beatInterval, lane: 1 },
          { time: 624 * beatInterval, lane: 1 },
          { time: 625 * beatInterval, lane: 0 },
          { time: 625.5 * beatInterval, lane: 1 },
          { time: 626 * beatInterval, lane: 2 },
          { time: 626.5 * beatInterval, lane: 3 },
          { time: 627 * beatInterval, lane: 2 },
          { time: 627.5 * beatInterval, lane: 0 },
          { time: 628 * beatInterval, lane: 3 },
          { time: 629 * beatInterval, lane: 2 },
          { time: 629.5 * beatInterval, lane: 1 },
          { time: 630 * beatInterval, lane: 0 },
          { time: 630.5 * beatInterval, lane: 1 },
          { time: 631 * beatInterval, lane: 0 },
          { time: 631.5 * beatInterval, lane: 1 },
          { time: 632 * beatInterval, lane: 0 },
          { time: 632.5 * beatInterval, lane: 1 },
          { time: 633 * beatInterval, lane: 0 },
          { time: 633.5 * beatInterval, lane: 1 },
          { time: 634 * beatInterval, lane: 0 },
          { time: 634.5 * beatInterval, lane: 1 },
          { time: 635 * beatInterval, lane: 0 },
          { time: 635.5 * beatInterval, lane: 1 },
          { time: 636 * beatInterval, lane: 0 },
          { time: 636.5 * beatInterval, lane: 1 },
          { time: 637 * beatInterval, lane: 0 },
          { time: 637.5 * beatInterval, lane: 1 },
          { time: 638 * beatInterval, lane: 0 },
          { time: 638.5 * beatInterval, lane: 2 },
          { time: 639 * beatInterval, lane: 1 },
          { time: 639.5 * beatInterval, lane: 2 },
          { time: 640 * beatInterval, lane: 1 },
          { time: 641 * beatInterval, lane: 3 },
          { time: 642 * beatInterval, lane: 1 },
          { time: 643 * beatInterval, lane: 2 },
          { time: 644 * beatInterval, lane: 2 },
          { time: 645 * beatInterval, lane: 2 },
          { time: 646 * beatInterval, lane: 2 },
          { time: 647 * beatInterval, lane: 3 },
          { time: 648 * beatInterval, lane: 2 },
          { time: 649 * beatInterval, lane: 0 },
          { time: 650 * beatInterval, lane: 1 },
          { time: 651 * beatInterval, lane: 3 },
          { time: 652 * beatInterval, lane: 1 },
          { time: 653 * beatInterval, lane: 2 },
          { time: 654 * beatInterval, lane: 2 },
          { time: 655 * beatInterval, lane: 2 },
          { time: 656 * beatInterval, lane: 2 },
          { time: 657 * beatInterval, lane: 3 },
          { time: 658 * beatInterval, lane: 2 },
          { time: 659 * beatInterval, lane: 0 },
          { time: 660 * beatInterval, lane: 1 },
          { time: 661 * beatInterval, lane: 3 },
          { time: 662 * beatInterval, lane: 1 },
          { time: 663 * beatInterval, lane: 2 },
          { time: 664 * beatInterval, lane: 2 },
          { time: 665 * beatInterval, lane: 2 },
          { time: 666 * beatInterval, lane: 2 },
          { time: 667 * beatInterval, lane: 3 },
          { time: 668 * beatInterval, lane: 2 },
          { time: 669 * beatInterval, lane: 0 },
          { time: 670 * beatInterval, lane: 1 },
          { time: 671 * beatInterval, lane: 3 },
          { time: 672 * beatInterval, lane: 1 },
          { time: 673 * beatInterval, lane: 2 },
          { time: 673.2 * beatInterval, lane: 2 },
          { time: 673.4 * beatInterval, lane: 2 },
          { time: 673.6 * beatInterval, lane: 2 },
          { time: 673.8 * beatInterval, lane: 2 }, 
          { time: 674 * beatInterval, lane: 1 },
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

                    if (index === 1) {
                        this.boxPop(160, 3500);  
                    }

                    if (index === 1140) {
                        this.boxPop(380, 3500);
                    }

                    if (index === 249 || index === 260 || index === 270 || index === 277 || index === 287 || index === 297 || index === 307 || index === 317){
                        this.boxPop(180, 3500);
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

    reduceRedBar(reductionAmount = 70) {
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

        if (this.platformGraphics) {
                this.platformGraphics.destroy();
            }

            this.platforms.forEach(platform => {
                if (platform) {
                    this.matter.world.remove(platform);
                }
            });

            if (this.playerGraphics) {
                this.playerGraphics.destroy();
            }

            if (this.player) {
                this.matter.world.remove(this.player);
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
        const offsetX = (this.cameras.main.width - platformWidth) / 2;
        const targetX = partWidth * lane + partWidth / 2 + offsetX;

        this.matter.body.setPosition(this.player, { x: targetX, y: this.player.position.y });
    }

    spawnNote(noteData) {
        const platformWidth = this.cameras.main.width / 1.5;
        const partWidth = platformWidth / 4;
        const offsetX = (this.cameras.main.width - platformWidth) / 2;
        const noteX = partWidth * noteData.lane + partWidth / 2 + offsetX;
        const noteColor = this.laneColors[noteData.lane];

        const note = this.add.rectangle(noteX, 0, partWidth - 10, 20, noteColor).setOrigin(0.5, 0.5);

        this.tweens.add({
            targets: note,
            y: this.player.position.y,
            duration: 2000,
            paused: this.isPaused,
            onComplete: () => {
                this.checkNoteHit(noteData.lane, note);
            }
        });
    }

    handlePlayerMove(lane) {
        this.movePlayerTo(lane);
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
        const offsetX = (this.cameras.main.width - platformWidth) / 2;
        const playerX = this.player.position.x;
        const playerY = this.player.position.y;
        
        const playerLane = Math.floor((playerX - offsetX) / partWidth);

        if (playerLane === lane && note.y >= playerY) {
            this.score++;
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

    createLanePop(lane) {
        const platformWidth = this.cameras.main.width / 1.5;
        const partWidth = platformWidth / 4;
        const platformHeight = 40; 
        const offsetX = (this.cameras.main.width - platformWidth) / 2;

        const platformX = partWidth * lane + partWidth / 2 + offsetX;;
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
                0x8A2BE2, 0x9400D3, 0x9932CC, 0x800080, 
                0x4B0082, 0x7B68EE, 0x6A0DAD, 0x6B46CE, 
                0x9B30FF, 0xB15FEE
            ]

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

    createStarPop(height = 200, xposition = 0, yposition = 0, duration = 1000, starCount = 5) {

        for (let i = 0; i < starCount; i++) {
            let square = this.add.rectangle(
                Phaser.Math.Between(0, this.cameras.main.width), 
                this.cameras.main.height, 
                10, 
                10, 
                0xFFFFFF
            );

            let randomX = Phaser.Math.Between(-400, 400);
            let randomUpwardDistance = Phaser.Math.Between(100, height);
            let randomRotationSpeed = Phaser.Math.FloatBetween(0.01, 0.05);

            this.tweens.add({
                targets: square,
                y: square.y - randomUpwardDistance,
                angle: square.angle + Phaser.Math.Between(90, 360),
                alpha: 0, 
                duration: duration,
                ease: 'Power3',
                onComplete: () => {
                    square.destroy();
                }
            });

            this.tweens.add({
                targets: square,
                angle: square.angle + Phaser.Math.Between(10, 360),
                duration: duration,
                ease: 'Linear',
                repeat: -1
            });
        }
    }

    createMissEffect(lane) {
            const platformWidth = this.cameras.main.width / 1.5;
            const partWidth = platformWidth / 4;;
            const platformY = this.cameras.main.height - 100;
            const offsetX = (this.cameras.main.width - platformWidth) / 2;
            const platformX = partWidth * lane + offsetX;
            const redShades = ['#8B0000', '#A52A2A', '#B22222', '#FF0000', '#FF4D4D', '#FF9999'];

            const missText = this.add.text(
                platformX + partWidth / 2,
                platformY - 50,
                'MISS', 
                {
                    fontSize: '32px', 
                    fill: Phaser.Utils.Array.GetRandom(redShades), 
                    fontFamily: 'Courier New',
                    fontStyle: 'bold'
                }
            ).setOrigin(0.5);

            const colorTween = this.time.addEvent({
                delay: 100, 
                callback: () => {
                    missText.setColor(Phaser.Utils.Array.GetRandom(redShades));
                },
                loop: true
            });

            this.tweens.add({
                targets: missText,
                y: platformY - 100,
                alpha: 0,
                duration: 1000,
                ease: 'Power1',
                onComplete: () => {
                    colorTween.remove();
                    missText.destroy();
                }
            });

            const platformRect = this.add.rectangle(platformX + partWidth / 2, platformY, partWidth, 15, Phaser.Utils.Array.GetRandom(redShades))
                    .setOrigin(0.5)
                    .setAlpha(0);

            const colorTweenRect = this.time.addEvent({
                    delay: 50,
                    callback: () => {
                    const randomColor = Phaser.Display.Color.HexStringToColor(Phaser.Utils.Array.GetRandom(redShades)).color;
                    platformRect.setFillStyle(randomColor);
                    },
                    loop: true
                });

                this.tweens.add({
                    targets: platformRect,
                    alpha: 0.9,
                    duration: 300,
                    yoyo: true,
                    onComplete: () => {
                        colorTweenRect.remove();
                        platformRect.destroy();
                    }
                });
            }
    
    boxPop(size = 50, duration = 1000) {

        let randomColor = Phaser.Utils.Array.GetRandom([0x800080, 0x4B0082, 0x9932CC, 0x8A2BE2]);
        let box = this.add.graphics();
        let randomAngle = Phaser.Math.Between(0, 360);
        let randomX = Phaser.Math.Between(0, this.cameras.main.width);
        let randomY = Phaser.Math.Between(0, this.cameras.main.height);

        box.lineStyle(4, randomColor, 1);
        box.strokeRect(-size / 2, -size / 2, size, size);
        box.setPosition(randomX, randomY);
        box.setRotation(Phaser.Math.DegToRad(randomAngle));
        box.setAlpha(1);

        this.tweens.add({
            targets: box,
            scaleX: 2,
            scaleY: 2,
            alpha: 0,
            duration: duration,
            ease: 'Power3',
            onComplete: () => {
                box.destroy();
            }
        });
    }
    
    updateScoreAndStreak() {
        this.scoreNumber.setText(this.score);
        const colors =[0x8A2BE2, 0x9400D3, 0x9932CC, 0x800080, 
                0x4B0082, 0x7B68EE, 0x6A0DAD, 0x6B46CE, 
                0x9B30FF, 0xB15FEE];

        let randomColor = Phaser.Utils.Array.GetRandom(colors);
        let randomColorHex = `#${randomColor.toString(16).padStart(6, '0')}`
        this.streakNumber.setText(this.currentStreak);

        this.createPoptext.call(this, this.scoreNumber);
        this.createPoptext.call(this, this.streakNumber);

        if (this.score >= 900) {
            this.createStarPop(400, 0, 0, 1000, 3);
        } else if (this.score >= 400) {
            this.createStarPop(400, 0, 0, 1000, 5);
        } else if (this.score >= 100) {
                this.createStarPop(350, 0, 0, 1000, 3);
        } else if (this.score >= 50) {
            this.createStarPop(200, 0, 0, 1000, 1);
        }

        if (this.currentStreak >= 77) {
        this.boxPop(100,1000);    this.streakNumber.setFill(randomColorHex);
            if (this.currentStreak === 77) {
                this.createSparkles.call(this, this.streakNumber, 0, 15, 1000);
            }
        } else if (this.currentStreak >= 47) {
        this.boxPop(50, 500);    this.streakNumber.setFill(randomColorHex);
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
        this.platforms.forEach(platform => {
            if (platform) {
                this.matter.world.remove(platform);
            }
        });

        if (this.player) {
            this.matter.world.remove(this.player);
        }
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

        if (this.score >= 1070) {
            return 'S';
        } else if (this.score >= 970) {
            return 'A';
        } else if (this.score >= 800) {
            return 'B';
        } else if (this.score >= 650) {
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
            if (document.hidden) {
                if (this.music && this.music.isPlaying && this.musicStarted && !this.isPaused) {
                    this.pauseGame();
                }
            }

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
  scene: [TitleScene, FinalBoss, Counting, Usagiflap, Planetloop],
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 0.5 },
      debug: true
    }
  }
};
        
const game = new Phaser.Game(config);