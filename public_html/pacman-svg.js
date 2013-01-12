pacman.svg = (function() {
    // functions return attributes for Raphael paper elements

    // svg paths

    function pacmanBody(position, rotation) {
        var r = pacman.config.tileSize / 2;
        // the angles for mouth movement
        var startAngle = Math.sin((pacman.frame / 30) * Math.PI) * 30;
        var endAngle = 359 - startAngle;

        var flag = (endAngle - startAngle) > 180;
        startAngle = (startAngle % 360) * Math.PI / 180;
        endAngle = (endAngle % 360) * Math.PI / 180;

        return {
            path: [["M", position.x, position.y],
                ["l", r * Math.cos(startAngle), r * Math.sin(startAngle)],
                ["A", r, r, 0, +flag, 1, position.x + r * Math.cos(endAngle),
                    position.y + r * Math.sin(endAngle)], ["z"]],
            transform: ["r", rotation, position.x, position.y],
            fill: pacman.config.colours.pacman,
            stroke: "none"
        };
    }

    function ghostBody(position, color) {
        var r = pacman.config.tileSize / 2;

        return {
            path: [["M", position.x - r, position.y + r],
                ["c", 0, -2.7 * r, 2 * r, -2.7 * r, 2 * r, 0], ["z"]],
            stroke: "none",
            fill: color
        };
    }

    // svg circles

    function ghostEye(whichEye, position) {
        var x = position.x - pacman.config.tileSize / 6;
        if (whichEye === "right") {
            x += pacman.config.tileSize / 3;
        }
        return {
            cx: x,
            cy: position.y - pacman.config.tileSize / 4,
            r: pacman.config.tileSize / 5,
            fill: "rgb(255, 255, 255)",
            stroke: "none"
        };
    }

    function ghostPupil(whichEye, position, movement) {
        var x = position.x - pacman.config.tileSize / 6;
        if (whichEye === "right") {
            x += pacman.config.tileSize / 3;
        }
        return {
            cx: x + movement.x * 2,
            cy: position.y - pacman.config.tileSize / 4 +
                    movement.y * (pacman.config.tileSize / 10),
            r: pacman.config.tileSize / 10,
            fill: "rgb(0, 0, 0)",
            stroke: "none"
        };
    }

    return {
        pacmanBody: pacmanBody,
        ghostBody: ghostBody,
        ghostEye: ghostEye,
        ghostPupil: ghostPupil
    };
})();
