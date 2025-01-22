export const CANVAS = `
<canvas bind:this={canvas} class="border-2 bg-black"></canvas>
`

export const RENDER = `
function draw() {
    ctx.clearRect(0, 0, 400, 800); // Clear the canvas
    drawGrid(CELLSIZE); // Draw the grid with 40px cells

    pieces.forEach((piece) => {
        if (!piece.grounded) {
            drawGhost(piece);
        }
    })

    pieces.forEach((element) => {
        // For each piece in the pieces array
        element.shape.forEach((row, rowIndex) => {
            // For each row of the piece
            row.forEach((cell, colIndex) => {
                // For each cell in the row
                if (cell === 1) {
                    // Set the fill color for the piece
                    ctx.fillStyle = element.color;

                    // Fill the rectangle (the block in the piece)
                    ctx.fillRect(
                        element.x + colIndex, 
                        element.y + rowIndex, 
                        1, 1
                    );

                    // Set the outline color (adjusted) and line width for the inner outline
                    ctx.strokeStyle = adjust(element.color, -30); // Outline color adjusted
                    ctx.lineWidth = 0.1; // Outline thickness

                    // Draw the outline, but slightly shrink the position to apply inside the shape
                    ctx.strokeRect(
                        element.x + colIndex + 0.05,  // Slightly shift right
                        element.y + rowIndex + 0.05,   // Slightly shift down
                        1 - 0.1,  // Shrink the width and height for the outline to appear inside
                        1 - 0.1    // Shrink the width and height for the outline to appear inside
                    );
                }
            });
        });
    });

    updateGrid();

    clearLines();
} `

export const GHOST = `function drawGhost(piece: Piece) {
        let ghostPiece: Piece = {
            x: piece.x,
            y: piece.y,
            color: "rgba(128, 128, 128, 0.2)",
            shape: piece.shape,
            grounded: false,
            pieceID: 1,
            isGhost: true
        }

        while (!collision(ghostPiece, "down")) {
            ghostPiece.y++;
        }

        ghostPiece.shape.forEach((row, rowIndex) => {
                // For each row of the piece
                row.forEach((cell, colIndex) => {
                    // For each cell in the row
                    if (cell === 1) {
                        // Set the fill color for the piece
                        ctx.fillStyle = ghostPiece.color;

                        // Fill the rectangle (the block in the piece)
                        ctx.fillRect(
                            ghostPiece.x + colIndex, 
                            ghostPiece.y + rowIndex, 
                            1, 1
                        );

                        // Set the outline color (adjusted) and line width for the inner outline
                        ctx.strokeStyle = "rgba(59, 59, 59, 0.2)"
                        ctx.lineWidth = 0.1; // Outline thickness

                        // Draw the outline, but slightly shrink the position to apply inside the shape
                        ctx.strokeRect(
                            ghostPiece.x + colIndex + 0.05,  // Slightly shift right
                            ghostPiece.y + rowIndex + 0.05,   // Slightly shift down
                            1 - 0.1,  // Shrink the width and height for the outline to appear inside
                            1 - 0.1    // Shrink the width and height for the outline to appear inside
                        );
                    }
                });
            });

    }`

export const UPDATE = `
function updateGrid() {
    grid = new Array(20).fill(0).map(() => new Array(10).fill(0));
    for (const piece of pieces) {
        if (!piece.grounded) continue;

        for (let row = 0; row < piece.shape.length; row++) {
            for (let col = 0; col < piece.shape[row].length; col++) {
                const cell = piece.shape[row][col];
                const x = piece.x + col;
                const y = piece.y + row;
                // Bounds check
                if (cell === 1 && y >= 0 && y < 20 && x >= 0 && x < 10) {
                    grid[y][x] = 1;
                }
            }
        }
    };
    if (client) client.updateGrid(grid)
} `

export const COLLISION = `
function collision(piece: Piece, direction?: string): boolean {
    let tempPiece = {
        x: piece.x,
        y: piece.y,
        color: piece.color,
        shape: piece.shape.map(row => [...row]), // copy the shape array
        grounded: piece.grounded,
        isGhost: piece.isGhost
    };
    if (direction === "left") {
        tempPiece.x--;
    } else if (direction === "right") {
        tempPiece.x++;
    } else if (direction === "down") {
        tempPiece.y++;
    }
    // Check for collisions with other pieces
    for (let row = 0; row < piece.shape.length; row++) {
        for (let col = 0; col < piece.shape[row].length; col++) {
            const cell = piece.shape[row][col];
            if (cell === 1) {
                const x = tempPiece.x + col;
                const y = tempPiece.y + row;


                for (const grounded of pieces) {
                    if (grounded.grounded && !grounded.isGhost) {
                        for (let gRow = 0; gRow < grounded.shape.length; gRow++) {
                            for (let gCol = 0; gCol < grounded.shape[gRow].length; gCol++) {
                                const gCell = grounded.shape[gRow][gCol];
                                if (
                                    gCell === 1 &&
                                    grounded.x + gCol === x &&
                                    grounded.y + gRow === y
                                ) {
                                    if (direction == "down" && !piece.isGhost) piece.grounded = true; 
                                    if (direction == "down" && !piece.isGhost) newPiece();
                                    if (piece.y == 0 && direction == "down") {
                                        if (client) client.leaveGame()

                                        gameOpened = true
                                        browsing = true  
                                        
                                        reset();

                                        return true;
                                    }
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    // Check grid boundaries

    // Leftmost x value
    let leftmostX = piece.shape[0].length;
    for (let row = 0; row < piece.shape.length; row++) {
        for (let col = 0; col < piece.shape[row].length; col++) {
            const cell = piece.shape[row][col];
            if (cell === 1) {
                leftmostX = Math.min(leftmostX, col); // Update to the smallest column index
            }
        }
    }
    leftmostX = tempPiece.x + leftmostX;

    //Rightmost x value
    let rightmostX = 0;
    for (let row = 0; row < piece.shape.length; row++) {
        for (let col = 0; col < piece.shape[row].length; col++) {
            const cell = piece.shape[row][col];
            if (cell === 1) {
                rightmostX = Math.max(rightmostX, col); // Update to the largest column index
            }
        }
    }
    rightmostX = tempPiece.x + rightmostX;

    //Bottom y value
    let bottomY = 0;
    for (let row = 0; row < piece.shape.length; row++) {
        for (let col = 0; col < piece.shape[row].length; col++) {
            const cell = piece.shape[row][col];
            if (cell === 1) {
                bottomY = Math.max(bottomY, row);
            }
        }
    }
    bottomY += tempPiece.y; // Adjust for the piece's position on the grid

    // console.log("Bottom Y:", bottomY);

    if (leftmostX < 0 || rightmostX >= 400 / CELLSIZE) {
        return true;
    } else if (bottomY >= 800 / CELLSIZE) {
        if (!tempPiece.isGhost) {
            newPiece();
            piece.grounded = true;
        }
        return true;
    }

    return false;
}`

export const CLEAR_LINES = `
function clearLines() {
    let clearedLines: number[] = [];
    // Check for full rows and mark them for clearing
    for (let row = 0; row < grid.length; row++) {
        if (isRowFull(grid[row])) {
            // console.log("row full", row)
            clearedLines.push(row);
        }
    }
    if (clearedLines.length <= 0) return;
    clearedLines.forEach(line => {
        // Remove the line
        grid.splice(line, 1);
        // Add a new empty row to the top
        grid.unshift(new Array(10).fill(0));
        
        for(const piece of pieces) {
            // Check if the piece is grounded
            if (piece.grounded) {
                let piecePartCleared = false;
                let pieceWidth = piece.shape[0].length;
                
                // For each row of the piece
                for (let row = 0; row < piece.shape.length; row++) {
                    // If it's in the same row as the cleared line
                    if ((piece.y + row) === line) {
                        // getGerby()
                        // Remove it from the pieces shape
                        piece.shape.splice(row, 1);
                        piecePartCleared = true;
                        
                        
                        // Add a new empty row to the top
                        piece.shape.unshift(new Array(pieceWidth).fill(0));
                        // console.table(piece.shape)
                        break;
                    }
                }
                
                // we automated deuterium yesterday on dyson sphere just a little fyi btw
                // If the piece was higher than the cleared line but had no part cleared
                if (!piecePartCleared && getLowestPieceY(piece) < line) {
                    piece.y++;
                }
            }
        };
    });
    
    updateScore(clearedLines.length);
    updateGrid();
}`

export const UPDATE_SCORE = `
function updateScore(clearedLines: number) {
    let currentScore = score;
    if (clearedLines > 0) {
        if (clearedLines === 1) {
            score += Math.floor(100 * level);
        } else if (clearedLines === 2) {
            score += Math.floor(300 * level);
        } else if (clearedLines === 3) {
            score += Math.floor(500 * level);
        } else if (clearedLines === 4) {
            score += Math.floor(800 * level);
        }
    }
    totalClears += clearedLines

    if (score != currentScore) {
        let scoreDifference = score - currentScore;
        announceScore(scoreDifference);
    }

    updateLevel();

    if (client) client.updateScore(score)
}`