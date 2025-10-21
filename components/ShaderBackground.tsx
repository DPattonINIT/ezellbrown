// 'use client';
// import { useEffect, useRef } from 'react';

// export default function ShaderBackground() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
    
//     const gl = canvas.getContext('webgl');
//     if (!gl) return;

//     // Set canvas size
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     gl.viewport(0, 0, canvas.width, canvas.height);

//     // --- Vertex shader ---
//     const vertex = gl.createShader(gl.VERTEX_SHADER);
//     if (!vertex) return;
    
//     gl.shaderSource(
//       vertex,
//       `
//       attribute vec2 a_position;
//       void main() {
//         gl_Position = vec4(a_position, 0.0, 1.0);
//       }
//     `
//     );
//     gl.compileShader(vertex);

//     // --- Fragment shader ---
//     const fragment = gl.createShader(gl.FRAGMENT_SHADER);
//     if (!fragment) return;
    
//     gl.shaderSource(
//       fragment,
//       `
//       precision mediump float;
//       uniform float time;
//       uniform vec2 resolution;
//       void main() {
//         vec2 uv = gl_FragCoord.xy / resolution.xy;
//         vec2 p = -1.0 + 2.0 * uv;
//         float a = time * 0.2;
//         float d = length(p);
//         float f = cos(d * 12.0 - a * 7.0);
//         vec3 col = vec3(0.5 + 0.5*f, 0.3 + 0.3*f, 0.7 + 0.3*f);
//         gl_FragColor = vec4(col, 1.0);
//       }
//     `
//     );
//     gl.compileShader(fragment);

//     // --- Program ---
//     const program = gl.createProgram();
//     if (!program) return;
    
//     gl.attachShader(program, vertex);
//     gl.attachShader(program, fragment);
//     gl.linkProgram(program);
//     gl.useProgram(program);

//     // --- Geometry buffer ---
//     const buffer = gl.createBuffer();
//     if (!buffer) return;
    
//     gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//     gl.bufferData(
//       gl.ARRAY_BUFFER,
//       new Float32Array([
//         -1, -1, 1, -1, -1, 1,
//         -1,  1, 1, -1, 1,  1,
//       ]),
//       gl.STATIC_DRAW
//     );

//     const a_position = gl.getAttribLocation(program, 'a_position');
//     gl.enableVertexAttribArray(a_position);
//     gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

//     // --- Uniforms ---
//     const u_time = gl.getUniformLocation(program, 'time');
//     const u_resolution = gl.getUniformLocation(program, 'resolution');

//     // --- Render loop ---
//     const start = performance.now(); // Fixed: changed from let to const

//     function render() {
//       if (!canvas || !gl) return; // Add null checks in the function
      
//       const now = performance.now();
//       const elapsed = (now - start) / 1000.0;

//       gl.viewport(0, 0, canvas.width, canvas.height);
      
//       if (u_time) gl.uniform1f(u_time, elapsed);
//       if (u_resolution) gl.uniform2f(u_resolution, canvas.width, canvas.height);
      
//       gl.drawArrays(gl.TRIANGLES, 0, 6);
//       requestAnimationFrame(render);
//     }

//     // --- Handle resize ---
//     function resize() {
//       if (!canvas || !gl) return; // Add null checks in the function
      
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//       gl.viewport(0, 0, canvas.width, canvas.height);
//     }

//     window.addEventListener('resize', resize);
//     render();

//     return () => {
//       window.removeEventListener('resize', resize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed inset-0 w-full h-full -z-10"
//     />
//   );
// }
//======================================================

'use client';
import { useEffect, useRef } from 'react';

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    // --- Vertex shader ---
    const vertex = gl.createShader(gl.VERTEX_SHADER);
    if (!vertex) return;

    gl.shaderSource(
      vertex,
      `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `
    );
    gl.compileShader(vertex);

    // --- Fragment shader (your custom one) ---
    const fragment = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragment) return;

    gl.shaderSource(
      fragment,
      `
      precision highp float;

      uniform float time;
      uniform vec2 mouse;
      uniform vec2 resolution;

      void main(void) {
        vec2 position = (gl_FragCoord.xy / resolution.xy) + mouse / 4.0;

        float color = 0.0;
        color += sin(position.x * cos(time / 15.0) * 80.0) + cos(position.y * cos(time / 15.0) * 10.0);
        color += sin(position.y * sin(time / 10.0) * 40.0) + cos(position.x * sin(time / 25.0) * 40.0);
        color += sin(position.x * sin(time / 5.0) * 10.0) + sin(position.y * sin(time / 35.0) * 80.0);
        color *= sin(time / 10.0) * 0.5;

        gl_FragColor = vec4(vec3(color, color * 0.5, sin(color + time / 3.0) * 0.75), 1.0);
      }
    `
    );
    gl.compileShader(fragment);

    // --- Program ---
    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.useProgram(program);

    // --- Geometry buffer ---
    const buffer = gl.createBuffer();
    if (!buffer) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1, 1, -1, -1, 1,
        -1,  1, 1, -1, 1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const a_position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(a_position);
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

    // --- Uniforms ---
    const u_time = gl.getUniformLocation(program, 'time');
    const u_resolution = gl.getUniformLocation(program, 'resolution');
    const u_mouse = gl.getUniformLocation(program, 'mouse');

    // track mouse pos
    let mouseX = 0.0;
    let mouseY = 0.0;
    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX / window.innerWidth;
      mouseY = 1.0 - e.clientY / window.innerHeight; // flip Y
    }
    window.addEventListener('mousemove', handleMouseMove);

    // --- Render loop ---
    const start = performance.now();

    function render() {
      if (!canvas || !gl) return;

      const now = performance.now();
      const elapsed = (now - start) / 1000.0;

      gl.viewport(0, 0, canvas.width, canvas.height);

    //   if (u_time) gl.uniform1f(u_time, elapsed);
    if (u_time) gl.uniform1f(u_time, elapsed * 0.5); // smaller multiplier = slower

      if (u_resolution) gl.uniform2f(u_resolution, canvas.width, canvas.height);
      if (u_mouse) gl.uniform2f(u_mouse, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    }

    // --- Handle resize ---
    function resize() {
      if (!canvas || !gl) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    window.addEventListener('resize', resize);
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
    />
  );
}
