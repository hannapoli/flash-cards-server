DROP TABLE IF EXISTS user_learning;
DROP TABLE IF EXISTS words;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS uploads;
DROP TABLE IF EXISTS languages;

-- Restricción de estas columnas a un conjunto fijo de valores
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE learning_status AS ENUM ('saved', 'learned');

-- Idiomas
CREATE TABLE languages (
    id_language SERIAL PRIMARY KEY,
    language VARCHAR(70) NOT NULL UNIQUE,
    code VARCHAR(10) UNIQUE
);

-- Usuarios
CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    firebase_uid VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100),
    role user_role NOT NULL DEFAULT 'user',
    ui_language_id INT DEFAULT 9,
    CONSTRAINT fk_ui_language 
        FOREIGN KEY (ui_language_id) 
        REFERENCES languages (id_language)
        ON DELETE SET NULL
);

-- Categorías
CREATE TABLE categories (
    id_category SERIAL PRIMARY KEY,
    category VARCHAR(150) NOT NULL,
    language_id INT NOT NULL,
    CONSTRAINT fk_category_language
        FOREIGN KEY (language_id)
        REFERENCES languages (id_language)
        ON DELETE CASCADE,
    CONSTRAINT unique_category_per_language
        UNIQUE (category, language_id)

);

-- Metadata de las imágenes subidas
CREATE TABLE uploads (
    id_upload SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    originalname VARCHAR(255) NOT NULL,
    mimetype VARCHAR(100) NOT NULL,
    size BIGINT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Palabras
CREATE TABLE words (
    id_word SERIAL PRIMARY KEY,
    word VARCHAR(100) NOT NULL,
    definition TEXT,
    transcription VARCHAR(150),
    example TEXT,
    category_id INT NOT NULL,
    image_id INT,
    CONSTRAINT fk_word_category
        FOREIGN KEY(category_id)
        REFERENCES categories (id_category)
        ON DELETE CASCADE,
    CONSTRAINT fk_word_img
        FOREIGN KEY(image_id)
        REFERENCES uploads (id_upload)
        ON DELETE SET NULL
);

-- Colecciones del usuario para estudiar
CREATE TABLE user_learning (
    id_learning SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    word_id INT NOT NULL,
    status learning_status NOT NULL DEFAULT 'saved',
    learned_at TIMESTAMP,
    CONSTRAINT fk_learning_user
        FOREIGN KEY(user_id)
        REFERENCES users (id_user)
        ON DELETE CASCADE,
    CONSTRAINT fk_learning_word
        FOREIGN KEY(word_id)
        REFERENCES words (id_word)
        ON DELETE CASCADE,
    CONSTRAINT unique_user_word
        UNIQUE (user_id, word_id)
);

-- Datos de prueba:
INSERT INTO languages (language, code) VALUES
('Árabe', 'ar'),
('Inglés', 'en'),
('Francés', 'fr'),
('Alemán', 'de'),
('Hindi', 'hi'),
('Japonés', 'ja'),
('Chino mandarín', 'zh'),
('Portugués', 'pt'),
('Español', 'es');

INSERT INTO users (firebase_uid, email, name, role, ui_language_id) VALUES
('firebase_admin_001', 'admin@test.com', 'Hector', 'admin', 2),
('firebase_user_001', 'user1@test.com', 'Maider', 'user', 2),
('firebase_user_002', 'user2@test.com', 'Nerea', 'user', 9);

INSERT INTO categories (category, language_id) VALUES
('Animals', 2),
('Food', 2),
('Animales', 9),
('Comida', 9);

INSERT INTO uploads (filename, originalname, mimetype, size)
VALUES
('dog_172345987.png', 'dog.png', 'image/png', 204800),
('cat_172345988.jpg', 'cat.jpg', 'image/jpeg', 189300);

INSERT INTO words (word, definition, transcription, example, category_id)
VALUES
('dog', 'A domesticated carnivorous mammal.', '/dɒɡ/', 'The dog is playing in the garden.', 1),
('cat', 'A small domesticated carnivorous mammal.', '/kæt/', 'The cat is sleeping on the sofa.', 1);

INSERT INTO user_learning (user_id, word_id, status)
VALUES
(2, 1, 'saved'),
(2, 2, 'learned');
