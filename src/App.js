import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from '@react-three/fiber';
import { Scena } from './components/Scena/Scena';
import { OrbitControls } from '@react-three/drei'; // Añadir controles de órbita
import { useSpring, animated } from '@react-spring/web';  // Librería para animaciones suaves

function App() {
  // Estado para animación del título
  const [hovered, setHovered] = useState(false);

  // Animación para el título con react-spring
  const titleProps = useSpring({
    transform: hovered ? 'scale(1.1)' : 'scale(1)',
    color: hovered ? 'rgba(0, 255, 255, 0.8)' : 'cyan',
    config: { tension: 300, friction: 10 },
  });

  useEffect(() => {
    // Efecto de parpadeo para los GIFs
    const interval = setInterval(() => {
      setHovered((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div style={styles.container}>
        {/* Título con diseño futurista */}
        <animated.h1
          style={{ ...styles.title, ...titleProps }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          SERVIBOT
        </animated.h1>

        <div style={styles.mainContent}>
          {/* Lado izquierdo con el Canvas (modelo) */}
          <div style={styles.canvasContainer}>
            <Canvas color="black" camera={{ zoom: 1, position: [1, 1, 1] }}>
              <ambientLight intensity={0.5} />
              <Suspense fallback={null}>
                <Scena />
              </Suspense>
              <OrbitControls />
            </Canvas>
          </div>

          {/* Lado derecho con los 3 GIFs sin animación */}
          <div style={styles.gifsContainer}>
            <img
              src="/caminando.gif"
              alt="GIF 1"
              style={styles.gifImage}
            />
            <img
              src="/bailando.gif"
              alt="GIF 2"
              style={styles.gifImage}
            />
            <img
              src="/observando.gif"
              alt="GIF 3"
              style={styles.gifImage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#0d0d0d',
    color: '#fff',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    overflow: 'hidden',
    border: '5px solid #00FFFF', // Borde cian alrededor de toda la página
    boxSizing: 'border-box', // Asegura que el borde no afecte al tamaño del contenido
    padding: '20px', // Espaciado interno
    borderRadius: '15px', // Bordes redondeados para un look más suave
    boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)', // Sombra para resaltar el borde
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    letterSpacing: '5px',
    color: 'cyan',
    textShadow: '0 0 10px rgba(0, 255, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.7), 0 0 30px rgba(0, 255, 255, 0.7)',
    marginBottom: '20px',
    fontFamily: '"Orbitron", sans-serif', // Tipografía futurista
    transition: 'all 0.3s ease-in-out',
  },
  mainContent: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '80vh',
    width: '100%',
    gap: '10px',
  },
  canvasContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gifsContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '10px',
  },
  gifImage: {
    maxWidth: '80%',
    maxHeight: '33%',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
  },
};

export default App;
