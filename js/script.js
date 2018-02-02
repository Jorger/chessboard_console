window.onload = () => {
    let board = [];
    let movement = "";
    const gameTokens = {
        tower : {
            sufix : "t", 
            piece : "♜"
        }, 
        horse : {
            sufix : "h", 
            piece : "♞"
        }, 
        bishop : {
            sufix : "b", 
            piece : "♝"
        }, 
        king : {
            sufix : "k", 
            piece : "♛"
        }, 
        queen : {
            sufix : "q", 
            piece : "♚"
        }, 
        pawn : {
            sufix : "p", 
            piece : "♟"
        }
    };
    const orderTokens = [
        "tower", "horse", 
        "bishop", "king", 
        "queen", "bishop", 
        "horse", "tower"
    ];

    //Crear la board inicial...
    const initialBoard = () => {
        for(let i = 0; i < 8; i++) {
            board.push([]);
            for(let c = 0; c < 8; c++) {
                let figure = " ";
                if(i === 0 || i === 1 || i === 6 || i === 7) {
                    figure = i === 0 || i === 7 ? (
                        gameTokens[orderTokens[c]].piece
                    ) : (
                        gameTokens.pawn.piece
                    );
                }
                board[i].push({
                    figure, 
                    colorToken : i <= 1 ? "black" : "white",
                    colorShadow : i <= 1 ? "white" : "black"
                })
            }
        }
    };

    const printLetters = () => {
        let chest = `%c   `;
        const styles = [
            `
                font-size: 1.8em;
                text-align: center;
            `
        ];
        for(let i = 0; i < 8; i++) {
            chest += `%c ${ String.fromCharCode(97 + i) } `;
            styles.push(
                `
                    font-size: 1.8em;
                    text-align: center;
                `
            );
        }
        return [
            chest, styles
        ];
    };

    const chessboard = () => {
        console.clear();
        let chest = "";
        let countBoard = 0;
        let numberColumns = 8;
        let boardColors = [];
        for(let i = 0; i < 8; i++) {
            if(i === 0) {
                const [letters, styles] = printLetters();
                chest += letters;
                boardColors = [...boardColors, ...styles];
                chest += `\n`;
            }
            chest += `%c ${ (8 - i) } `;
            boardColors.push(
                `
                    font-size: 1.8em;
                    text-align: center;
                `
            );
            for(let c = 0; c < 8; c++) {
                const {figure = " ", colorToken = "", colorShadow = ""} = board[i][c];
                chest += `%c ${figure} `;
                boardColors.push(
                    `
                        background: ${countBoard % 2 == 0 ? "#fecf9d" : "#d28a44"}; 
                        color: ${colorToken}; 
                        font-weight: bold;
                        font-size: 1.8em;
                        text-shadow: 1px 1px 1px ${colorShadow};
                        text-align: center;
                    `
                );
                countBoard++;
            }
            chest += `%c ${ (8 - i) } `;
            boardColors.push(
                `
                    font-size: 1.8em;
                    text-align: center;
                `
            );
            countBoard++;
            chest += `\n`;
            if(i === 7) {
                const [letters, styles] = printLetters();
                chest += letters;
                boardColors = [...boardColors, ...styles];
            }
        }
        return {
            chest, 
            boardColors
        };
    };

    const movePiece = (move) => {
        if(move) {
            const makeMovement = (
                move[0].toLowerCase().charCodeAt() >= 97 && move[0].toLowerCase().charCodeAt() <= 104
            ) && (
                parseInt(move[1]) >= 1 && parseInt(move[1]) <= 8
            ) && (
                move[2].toLowerCase().charCodeAt() >= 97 && move[2].toLowerCase().charCodeAt() <= 104
            ) && (
                parseInt(move[3]) >= 1 && parseInt(move[3]) <= 8
            );
            if(makeMovement) {
                const boardRow = move[0].toLowerCase().charCodeAt() - 97;
                const columnBoard = 8 - parseInt(move[1]);
                const destinyRow = move[2].toLowerCase().charCodeAt() - 97;
                const destinyColumn = 8 - parseInt(move[3]);
                const piecePosition = board[columnBoard][boardRow];
                if(piecePosition.figure !== " ") {
                    board[destinyColumn][destinyRow] = {...board[columnBoard][boardRow]};
                    board[columnBoard][boardRow].figure = " ";
                    let {chest, boardColors} = chessboard();
                    console.log(chest, ...boardColors);
                } else {
                    alert("There is no piece in that place");
                }
            } else {
                alert("The movement is not valid");
            }
            setTimeout(() => {
                movePiece(prompt("Indicate the movement: "));
            }, 2000);    
        }
    };    

    const startChessBoard = () => {
        board = [];
        initialBoard();
        let {chest, boardColors} = chessboard();
        console.log(chest, ...boardColors);
        setTimeout(() => {
            movePiece(prompt("Indicate the movement: "));
        }, 1000);
    };
    
    if(window.devtools.open) {
        startChessBoard();   
    }
    window.addEventListener('devtoolschange',  (e) => {
        if(e.detail.open) {
            startChessBoard();
        } else {
            console.clear();
        }
    });
};