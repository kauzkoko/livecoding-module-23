export const useShadersGPT = (options: { balls: number; color: [] }) => {
  let balls = options.balls ?? 5;
  let color = options.color ?? [0.0, 0.0, 0.0, 1];

  let vertexShader = `attribute vec3 aPosition;
          uniform float width;
          uniform float height;
          varying highp vec2 vPos;
    
          void main() {
            gl_Position = vec4(aPosition, 1.0);
            vPos = vec2(
              (gl_Position.x + 1.) / 2. * width,
              (gl_Position.y + 1.) / 2. * height);
          }`;

  let fragmentShader = `
    precision highp float;

    #define BALLS ${balls}
    
    uniform float xs[BALLS];
    uniform float ys[BALLS];
    uniform float rs[BALLS];
    uniform vec4 ballColors[BALLS]; // Add this line to define colors for each ball
    // vec4 ballColors[BALLS] = [vec4(1.0, 0.0, 0.0, 1.0),vec4(1.0, 0.0, 0.0, 1.0,vec4(1.0, 0.0, 0.0, 1.0,vec4(1.0, 0.0, 0.0, 1.0,vec4(1.0, 0.0, 0.0, 1.0,vec4(1.0, 0.0, 0.0, 1.0,vec4(1.0, 0.0, 0.0, 1.0,vec4(1.0, 0.0, 0.0, 1.0]; // Red ball (default
    uniform vec4 test;
    uniform vec4 testArray[2];

    varying highp vec2 vPos;
    
    void main() {
        vec4 color = vec4(0.0); // Initialize the color as transparent or background color
        float totalInfluence = 0.0;
    
        for (int i = 0; i < BALLS; i++) {
            float dx = xs[i] - vPos.x;
            float dy = ys[i] - vPos.y;
            float d = length(vec2(dx, dy));
            float influence = rs[i] / d;
            
            // color += vec4(i, 0.0, 0.0, 1.0) * influence; // Blend the color based on influence
            color += ballColors[i] * influence; // Blend the color based on influence
            totalInfluence += influence;
        }
    
        if (totalInfluence > 16.) {
            gl_FragColor = color / totalInfluence; // Normalize color by total influence
        } else {
            gl_FragColor = vec4(vec3(1.), 0.0); // Background color
        }
    }  
  `;
  return { fragmentShader, vertexShader };
};
