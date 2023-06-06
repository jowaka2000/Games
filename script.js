document.addEventListener("DOMContentLoaded", function () {
    let score = 0;
    let tiles = [];
    let selectedTile = null;
    let canFlip = false;

    function generateTiles() {
      const newTiles = [];
      const colors = ['red', 'blue', 'green', 'yellow'];

      for (let i = 0; i < 8; i++) {
        const colorIndex = Math.floor(Math.random() * colors.length);
        const color = colors[colorIndex];
        newTiles.push({ id: i, color: color, flipped: false });
        newTiles.push({ id: i + 8, color: color, flipped: false });
      }

      shuffleTiles(newTiles);
      tiles = newTiles;

      renderTiles();

      setTimeout(() => {
        tiles.forEach((tile) => {
          tile.flipped = true;
        });

        renderTiles();

        setTimeout(() => {
          tiles.forEach((tile) => {
            tile.flipped = false;
          });

          canFlip = true;
          renderTiles();
        }, 2000);
      }, 1000);
    }

    function shuffleTiles(tiles) {
      for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
      }
    }

    function flipTile(tile) {
      if (!canFlip || tile.flipped) {
        return;
      }

      if (selectedTile) {
        if (selectedTile.id !== tile.id && selectedTile.color === tile.color) {
          const updatedTiles = tiles.map((t) =>
            t.id === tile.id || t.id === selectedTile.id ? { ...t, flipped: true } : t
          );
          tiles = updatedTiles;
          selectedTile = null;
          score += 10;
        } else {
          setTimeout(() => {
            const updatedTiles = tiles.map((t) =>
              t.id === tile.id || t.id === selectedTile.id ? { ...t, flipped: false } : t
            );
            tiles = updatedTiles;
            selectedTile = null;
            score -= 5;
            renderTiles();
          }, 1000);
        }
      } else {
        const updatedTiles = tiles.map((t) => (t.id === tile.id ? { ...t, flipped: true } : t));
        tiles = updatedTiles;
        selectedTile = tile;
      }

      renderTiles();
    }

    function renderTiles() {
      const tilesContainer = document.getElementById("tilesContainer");
      tilesContainer.innerHTML = "";

      tiles.forEach((tile) => {
        const tileElement = document.createElement("div");
        tileElement.className = "tile";
        tileElement.style.backgroundColor = tile.flipped ? tile.color : "gray";
        tileElement.addEventListener("click", () => flipTile(tile));
        tileElement.disabled = tile.flipped;

        tilesContainer.appendChild(tileElement);
      });

      document.getElementById("scoreText").textContent = "Score: " + score;
    }

    function flipTile(tile) {
        if (!canFlip || tile.flipped) {
          return;
        }
      
        if (selectedTile) {
          if (selectedTile.id !== tile.id && selectedTile.color === tile.color) {
            const updatedTiles = tiles.map((t) =>
              t.id === tile.id || t.id === selectedTile.id ? { ...t, flipped: true } : t
            );
            tiles = updatedTiles;
            selectedTile = null;
            score += 10;
      
            showPopupMessage("Success! You found a match!");
          } else {
            setTimeout(() => {
              const updatedTiles = tiles.map((t) =>
                t.id === tile.id || t.id === selectedTile.id ? { ...t, flipped: false } : t
              );
              tiles = updatedTiles;
              selectedTile = null;
              score -= 5;
              renderTiles();
      
              showPopupMessage("Oops! Try again!");
            }, 1000);
          }
        } else {
          const updatedTiles = tiles.map((t) => (t.id === tile.id ? { ...t, flipped: true } : t));
          tiles = updatedTiles;
          selectedTile = tile;
        }
      
        renderTiles();
      }
      
      function showPopupMessage(message) {
        const popup = document.getElementById("popupMessage");
        const popupText = document.getElementById("popupText");
        const overlay = document.querySelector(".overlay");

        popupText.textContent = message;
        popup.style.display = "block";
        setTimeout(() => {
            popup.style.display = "none";
            overlay.style.display = "none";
          }, 2000);
      }
      


    generateTiles();
  });