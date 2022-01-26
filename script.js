const rgbValueContainer = document.querySelector('.rgb-value-container');
        const rgbValueText = document.querySelector('.rgb-value');
        const newColor = document.querySelector('.controls-games-bar ul li:first-child');
        let colors = document.querySelectorAll('.color');
        const colorsContainer = document.querySelector('.colors-container')
        const stat = document.querySelector('.controls-games-bar ul li:nth-child(2)');
        const hardBtn = document.getElementById('hard');
        const easyBtn = document.getElementById('easy');
        let mode = 'easy';

        // get Random RGB value
        function getRandomValueRgb() {
            let redValue = Math.floor(Math.random() * (255 - 0 ));
            let greenValue = Math.floor(Math.random() * (255 - 0));
            let blueValue = Math.floor(Math.random() * (255 - 0 ));
            return `rgb(${redValue}, ${greenValue}, ${blueValue})`; 
        }
        
        // give random value at the begin of the games
        rgbValueText.innerText = getRandomValueRgb();
        rulesEasyMode(colors, randomNumbers());
        
        
        // give random color to color div in easy mode
        function randomNumbers() {
            return Math.round(Math.random() * (6 - 1) + 1);
        }

        // rules easy mode
        function rulesEasyMode(arr, index) {
            if( index < 3 ){
                arr[0].style.backgroundColor = rgbValueText.innerText;
                arr[1].style.backgroundColor = getRandomValueRgb();
                arr[2].style.backgroundColor = getRandomValueRgb();
            }else if( index >= 3 && index < 5 ){
                arr[1].style.backgroundColor = rgbValueText.innerText;
                arr[0].style.backgroundColor = getRandomValueRgb();
                arr[2].style.backgroundColor = getRandomValueRgb();
            }else{
                arr[2].style.backgroundColor = rgbValueText.innerText;
                arr[0].style.backgroundColor = getRandomValueRgb();
                arr[1].style.backgroundColor = getRandomValueRgb();
            }
        }

        // rules Hard mode
        function rulesHardmode(arr, index) {
            arr[index - 1].style.backgroundColor = rgbValueText.innerText;
            for( let i = 0; i < arr.length; i++ ){
                if( i === index - 1 ){
                    continue;
                }else{
                    arr[i].style.backgroundColor = getRandomValueRgb();
                }
            }
        }

        // changing dificulty level
        function changingMode(mode, arr) {
            if( mode == 'easy' ){
                rulesEasyMode(arr, randomNumbers());
            }else if( mode == 'hard' ){
                rulesHardmode(arr, randomNumbers());
            }
        } 



        // pick the right color
       colorsContainer.addEventListener('click', (e) => {
            if( e.target.className == 'color' ){
                if( e.target.style.backgroundColor == rgbValueText.innerText.toLowerCase() ){
                    for(const divColor of e.target.parentElement.children){
                        divColor.style.backgroundColor = e.target.style.backgroundColor;
                    }    
                    rgbValueContainer.style.backgroundColor = e.target.style.backgroundColor;
                    stat.innerText = 'Correct!!!';
                    stat.style.color = '#95CD41';
                }else{
                    e.target.style.backgroundColor = '#333';
                    stat.innerText = 'Let\'s Try Again!!!';
                    stat.style.color = '#FF5677';
                }
            }
       })

        function reset() {
            getRandomValueRgb();
            rgbValueText.innerText = getRandomValueRgb();
            rgbValueContainer.style.backgroundColor = '#38A3A5';
            changingMode(mode, colors);
        }

        // new color
        newColor.addEventListener('click', () => {
            reset();
        })

        // change to hard mode
        hardBtn.addEventListener('click', () => {
            for( let i = 0; i < 3; i++ ){
                const newDiv = document.createElement('div');
                newDiv.classList.add('color');
                colorsContainer.appendChild(newDiv);
            }
            colors = document.querySelectorAll('.color');
            mode = 'hard';
            reset();

        })

        easyBtn.addEventListener('click', () => {
            for( let i = colors.length; i > 3; i-- ){
                colors = document.querySelectorAll('.color');
                colorsContainer.removeChild(colors[i - 1]);
            }
            colors = document.querySelectorAll('.color');
            mode = 'easy';
            reset();
        })