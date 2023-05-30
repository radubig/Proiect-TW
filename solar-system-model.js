window.onload = function() {
    let dropdown = document.getElementById('dropdown');
    dropdown.addEventListener('mouseover', DropdownCallback);

    function DropdownCallback(e) {
        let dropdownmenu = document.getElementById('dropdown-menu');
        dropdownmenu.classList.add('hovered');
    }

    let main = document.querySelector('main');
    let canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = document.body.clientWidth;
    canvas.height = 1000;

    main.appendChild(canvas);

    // Define solar system parameters
    const sunRadius = 50;
    const planetRadii = [10, 30, 30, 20, 80, 100, 50, 50];
    const planetOrbitRadii = [80, 150, 230, 300, 430, 640, 810, 920];
    const planetOrbitSpeeds = [0.01, 0.008, 0.006, 0.004, 0.003, 0.002, 0.0015, 0.001];

    // Load planet images
    let planetImages = new Array(8);
    for(let i = 0; i < planetImages.length; i++) {
        planetImages[i] = new Image();
    }
    planetImages[0].src = "images/mercury.png";
    planetImages[1].src = "images/venus.png";
    planetImages[2].src = "images/earth.png";
    planetImages[3].src = "images/mars.png";
    planetImages[4].src = "images/jupiter.png";
    planetImages[5].src = "images/saturn.png";
    planetImages[6].src = "images/uranus.png";
    planetImages[7].src = "images/neptune.png";

    // Define initial positions
    const planetAngles = Array(8).fill(0);

    let canvas_clicked = false;
    let colors = new Array(8);

    let reset_canvas = null;
    canvas.addEventListener('mousedown', function(e) {
        if(reset_canvas)
            window.clearTimeout(reset_canvas);

        canvas_clicked = true;

        // Randomize colors
        for(let i = 0; i < colors.length; i++) {
            colors[i] = getRandomColor();
        }

        // Set timeout to reset canvas_clicked
        reset_canvas = window.setTimeout(() => {canvas_clicked = false; reset_canvas=null;}, 3000);
    });

    // Start animation
    animate();

    // Animation loop
    function animate() {
        // Get context
        const context = canvas.getContext("2d");

        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        const originX = canvas.width / 2;
        const originY = canvas.height / 2;

        // Draw sun
        context.beginPath();
        context.arc(originX, originY, sunRadius, 0, Math.PI * 2);
        context.fillStyle = "yellow";
        context.fill();

        // Draw planets
        for (let i = 0; i < planetRadii.length; i++) {
            const planetX =
                originX +
                planetOrbitRadii[i] * Math.cos(planetAngles[i]);
            const planetY =
                originY +
                planetOrbitRadii[i] * Math.sin(planetAngles[i]);

            if(!canvas_clicked) {
                context.drawImage(
                    planetImages[i],
                    planetX - planetRadii[i],
                    planetY - planetRadii[i],
                    planetRadii[i] * 2,
                    planetRadii[i] * 2
                );
            } else {
                context.beginPath();
                context.arc(planetX, planetY, planetRadii[i], 0, Math.PI * 2);
                context.fillStyle = colors[i];
                context.fill();
            }

            planetAngles[i] += planetOrbitSpeeds[i];
        }

        // Request next frame
        requestAnimationFrame(animate);
    }

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}