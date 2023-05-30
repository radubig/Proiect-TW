window.onload = function() {
    let main = document.querySelector('main');
    let canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = 1000;
    canvas.height = 1000;

    main.appendChild(canvas);

    // Define solar system parameters
    const sunRadius = 50;
    const planetRadii = [10, 15, 20, 25, 30, 35, 40, 45];
    const planetOrbitRadii = [100, 150, 200, 250, 300, 350, 400, 450];
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

    // Define some colors
    let colors = new Array(8);
    for(let i = 0; i < colors.length; i++) {
        colors[i] = getRandomColor();
    }

    // Animation loop
    function animate() {
        // Get context
        const context = canvas.getContext("2d");

        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw sun
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height / 2, sunRadius, 0, Math.PI * 2);
        context.fillStyle = "yellow";
        context.fill();

        // Draw planets
        for (let i = 0; i < planetRadii.length; i++) {
            const planetX =
                canvas.width / 2 +
                planetOrbitRadii[i] * Math.cos(planetAngles[i]);
            const planetY =
                canvas.height / 2 +
                planetOrbitRadii[i] * Math.sin(planetAngles[i]);

            /*
            context.beginPath();
            context.arc(
                planetX,
                planetY,
                planetRadii[i],
                0,
                Math.PI * 2
            );
            //context.fillStyle = colors[i];
            context.fillStyle = context.createPattern(planetImages[i], "repeat");
            context.fill();
            */

            context.drawImage(
                planetImages[i],
                planetX - planetRadii[i],
                planetY - planetRadii[i],
                planetRadii[i] * 2,
                planetRadii[i] * 2
            );

            planetAngles[i] += planetOrbitSpeeds[i];
        }

        // Request next frame
        requestAnimationFrame(animate);
    }

    // Helper function to generate random colors
    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Start animation
    animate();
}