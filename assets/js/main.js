const player = document.getElementById('player');
const musicToggle = document.getElementById('music-toggle');

if (player && musicToggle) {
    musicToggle.addEventListener('click', async () => {
        try {
            if (player.paused) {
                await player.play();
            } else {
                player.pause();
            }
        } catch (error) {
            console.error('Nao foi possivel controlar o audio.', error);
        }
    });

    player.addEventListener('play', () => {
        musicToggle.textContent = '⏸ Pause';
        musicToggle.setAttribute('aria-label', 'Pausar musica');
    });

    player.addEventListener('pause', () => {
        musicToggle.textContent = '▶ Play';
        musicToggle.setAttribute('aria-label', 'Reproduzir musica');
    });
}

const galleryLinks = document.querySelectorAll('.project-gallery a');

if (galleryLinks.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Visualizacao ampliada da tela do sistema');
    lightbox.innerHTML = `
        <button class="image-lightbox-close" type="button" aria-label="Fechar imagem">×</button>
        <img class="image-lightbox-img" src="" alt="">
        <p class="image-lightbox-caption"></p>
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector('.image-lightbox-img');
    const lightboxCaption = lightbox.querySelector('.image-lightbox-caption');
    const closeButton = lightbox.querySelector('.image-lightbox-close');

    const closeLightbox = () => {
        lightbox.classList.remove('is-open');
        document.body.classList.remove('lightbox-open');
        lightboxImage.src = '';
        lightboxImage.alt = '';
    };

    galleryLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const image = link.querySelector('img');
            const caption = link.closest('figure')?.querySelector('figcaption')?.textContent || '';

            lightboxImage.src = link.href;
            lightboxImage.alt = image?.alt || caption;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('is-open');
            document.body.classList.add('lightbox-open');
            closeButton.focus();
        });
    });

    closeButton.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
            closeLightbox();
        }
    });
}
