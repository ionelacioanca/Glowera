import {
  BlurMask,
  Canvas,
  Circle,
  LinearGradient,
  Path,
  Rect,
  Skia,
  vec,
} from "@shopify/react-native-skia";
import { MotiView } from "moti";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

type GloweraNebulaProps = {
  children?: ReactNode;
};

const randomBetween = (min: number, max: number, seed: number) => {
  const x = Math.sin(seed * 999) * 10000;
  return min + (x - Math.floor(x)) * (max - min);
};

const starClusters = [
  { x: 0.12, y: 0.18, count: 26, spreadX: 140, spreadY: 100 },
  { x: 0.75, y: 0.22, count: 22, spreadX: 130, spreadY: 95 },
  { x: 0.18, y: 0.68, count: 24, spreadX: 150, spreadY: 110 },
  { x: 0.76, y: 0.6, count: 18, spreadX: 140, spreadY: 90 },
  { x: 0.5, y: 0.4, count: 16, spreadX: 120, spreadY: 80 },
  { x: 0.3, y: 0.9, count: 14, spreadX: 120, spreadY: 70 },
  { x: 0.92, y: 0.62, count: 14, spreadX: 110, spreadY: 80 },
];

const milkyWayDust = Array.from({ length: 150 }).map((_, index) => ({
  id: index,
  progress: index / 149,
  offsetX: randomBetween(-42, 42, index + 10),
  offsetY: randomBetween(-30, 30, index + 50),
  size: randomBetween(0.55, 1.8, index + 90),
  opacity: randomBetween(0.24, 0.85, index + 140),
}));

const purpleMilkyWay = Array.from({ length: 135 }).map((_, index) => ({
  id: index,
  progress: index / 134,
  offsetX: randomBetween(-40, 40, index + 300),
  offsetY: randomBetween(-30, 30, index + 350),
  size: randomBetween(0.45, 1.6, index + 700),
  opacity: randomBetween(0.22, 0.75, index + 900),
}));

const topLeftDust = Array.from({ length: 75 }).map((_, index) => ({
  id: index,
  progress: index / 74,
  offsetX: randomBetween(-24, 24, index + 1200),
  offsetY: randomBetween(-22, 22, index + 1400),
  size: randomBetween(0.4, 1.25, index + 1600),
  opacity: randomBetween(0.14, 0.44, index + 1800),
}));

const upperRightDust = Array.from({ length: 140 }).map((_, index) => ({
  id: index,
  progress: index / 139,
  offsetX: randomBetween(-26, 26, index + 10000),
  offsetY: randomBetween(-20, 20, index + 11000),
  size: randomBetween(0.45, 1.25, index + 12000),
  opacity: randomBetween(0.22, 0.62, index + 13000),
}));

const randomDust = Array.from({ length: 1300 }).map((_, index) => ({
  id: index,
  x: randomBetween(0, 1, index + 2000),
  y: randomBetween(0, 1, index + 2300),
  size: randomBetween(0.08, 0.48, index + 2600),
  opacity: randomBetween(0.08, 0.3, index + 2900),
}));

const randomSparkles = Array.from({ length: 8 }).map((_, index) => ({
  id: index,
  x: randomBetween(0.04, 0.96, index + 6000),
  y: randomBetween(0.05, 0.95, index + 7000),
  size: randomBetween(3.2, 5.2, index + 8000),
  opacity: randomBetween(0.18, 0.42, index + 9000),
}));

const sparkles = [
  { x: 0.16, y: 0.16, size: 7 },
  { x: 0.84, y: 0.2, size: 6 },
  { x: 0.22, y: 0.6, size: 6 },
  { x: 0.86, y: 0.74, size: 5 },
];

function createSparklePath(x: number, y: number, size: number) {
  const path = Skia.Path.Make();

  path.moveTo(x, y - size);
  path.lineTo(x, y + size);

  path.moveTo(x - size, y);
  path.lineTo(x + size, y);

  const diagonal = size * 0.62;

  path.moveTo(x - diagonal, y - diagonal);
  path.lineTo(x + diagonal, y + diagonal);

  path.moveTo(x + diagonal, y - diagonal);
  path.lineTo(x - diagonal, y + diagonal);

  return path;
}

function MovingDustLayer() {
  const { width, height } = useWindowDimensions();

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      {upperRightDust.map((dust) => {
        const startX = width * 1.02;
        const startY = height * 0.12;

        const endX = width * 0.52;
        const endY = height * 0.34;

        const x = startX + (endX - startX) * dust.progress + dust.offsetX;
        const y = startY + (endY - startY) * dust.progress + dust.offsetY;

        return (
          <Circle
            key={`upper-right-${dust.id}`}
            cx={x}
            cy={y}
            r={dust.size}
            color="#FFF8FB"
            opacity={dust.opacity}
          />
        );
      })}
    </Canvas>
  );
}

function MovingMilkyWayLayer() {
  const { width, height } = useWindowDimensions();

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      {milkyWayDust.map((dust) => {
        const startX = width * 1.08;
        const startY = height * 0.45;

        const endX = width * 0.18;
        const endY = height * 0.8;

        const x = startX + (endX - startX) * dust.progress + dust.offsetX;
        const y = startY + (endY - startY) * dust.progress + dust.offsetY;

        return (
          <Circle
            key={`main-moving-${dust.id}`}
            cx={x}
            cy={y}
            r={dust.size}
            color="#FFF8FB"
            opacity={dust.opacity}
          />
        );
      })}

      {milkyWayDust.slice(0, 32).map((dust) => {
        const startX = width * 1.08;
        const startY = height * 0.45;

        const endX = width * 0.18;
        const endY = height * 0.8;

        const x =
          startX + (endX - startX) * dust.progress + dust.offsetX * 0.6;
        const y =
          startY + (endY - startY) * dust.progress + dust.offsetY * 0.6;

        return (
          <Circle
            key={`main-glow-${dust.id}`}
            cx={x}
            cy={y}
            r={dust.size * 2.4}
            color="#FFF2F8"
            opacity={0.07}
          >
            <BlurMask blur={4} style="normal" />
          </Circle>
        );
      })}

      {purpleMilkyWay.map((dust) => {
        const startX = width * 1.08;
        const startY = height * 0.45;

        const endX = width * 0.28;
        const endY = height * 0.79;

        const x = startX + (endX - startX) * dust.progress + dust.offsetX;
        const y = startY + (endY - startY) * dust.progress + dust.offsetY;

        return (
          <Circle
            key={`purple-moving-${dust.id}`}
            cx={x}
            cy={y}
            r={dust.size}
            color="#FFF6FB"
            opacity={dust.opacity}
          />
        );
      })}

      {purpleMilkyWay.slice(0, 28).map((dust) => {
        const startX = width * 1.08;
        const startY = height * 0.45;

        const endX = width * 0.28;
        const endY = height * 0.79;

        const x =
          startX + (endX - startX) * dust.progress + dust.offsetX * 0.6;
        const y =
          startY + (endY - startY) * dust.progress + dust.offsetY * 0.6;

        return (
          <Circle
            key={`purple-glow-${dust.id}`}
            cx={x}
            cy={y}
            r={dust.size * 2.5}
            color="#FFF6FB"
            opacity={0.065}
          >
            <BlurMask blur={4} style="normal" />
          </Circle>
        );
      })}
    </Canvas>
  );
}

function NebulaBaseLayer() {
  const { width, height } = useWindowDimensions();

  const clusteredStars = useMemo(() => {
    return starClusters.flatMap((cluster, clusterIndex) =>
      Array.from({ length: cluster.count }).map((_, index) => {
        const seed = clusterIndex * 100 + index + 1;

        return {
          id: `${clusterIndex}-${index}`,
          x:
            cluster.x * width +
            randomBetween(-cluster.spreadX, cluster.spreadX, seed),
          y:
            cluster.y * height +
            randomBetween(-cluster.spreadY, cluster.spreadY, seed + 20),
          size: randomBetween(0.55, 1.35, seed + 40),
          opacity: randomBetween(0.22, 0.68, seed + 60),
        };
      })
    );
  }, [width, height]);

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(0, height * 0.02)}
          end={vec(width, height * 0.98)}
          colors={[
            "#F8CFE0",
            "#F5C1D7",
            "#E7B0CF",
            "#A86A9D",
            "#7B4A86",
            "#C184B5",
            "#F3BCD4",
          ]}
        />
      </Rect>

      {clusteredStars.map((star) => (
        <Circle
          key={star.id}
          cx={star.x}
          cy={star.y}
          r={star.size}
          color="#FFF8FB"
          opacity={star.opacity}
        />
      ))}

      {topLeftDust.map((dust) => {
        const startX = width * 0.02;
        const startY = height * 0.18;

        const endX = width * 0.38;
        const endY = height * 0.38;

        const x = startX + (endX - startX) * dust.progress + dust.offsetX;
        const y = startY + (endY - startY) * dust.progress + dust.offsetY;

        return (
          <Circle
            key={`top-left-${dust.id}`}
            cx={x}
            cy={y}
            r={dust.size}
            color="#FFF8FB"
            opacity={dust.opacity}
          />
        );
      })}

      {randomDust.map((dust) => (
        <Circle
          key={`random-${dust.id}`}
          cx={dust.x * width}
          cy={dust.y * height}
          r={dust.size}
          color="#FFF8FB"
          opacity={dust.opacity}
        />
      ))}

      {randomSparkles.map((sparkle) => {
        const path = createSparklePath(
          sparkle.x * width,
          sparkle.y * height,
          sparkle.size
        );

        return (
          <Path
            key={`random-sparkle-${sparkle.id}`}
            path={path}
            color="#FFF8FB"
            style="stroke"
            strokeWidth={0.65}
            strokeCap="round"
            opacity={sparkle.opacity}
          >
            <BlurMask blur={0.5} style="normal" />
          </Path>
        );
      })}

      {sparkles.map((sparkle, index) => {
        const path = createSparklePath(
          sparkle.x * width,
          sparkle.y * height,
          sparkle.size
        );

        return (
          <Path
            key={`sparkle-${index}`}
            path={path}
            color="#FFF8FB"
            style="stroke"
            strokeWidth={0.85}
            strokeCap="round"
            opacity={0.68}
          >
            <BlurMask blur={0.6} style="normal" />
          </Path>
        );
      })}
    </Canvas>
  );
}

export function GloweraNebula({ children }: GloweraNebulaProps) {
  return (
    <View style={styles.root}>
      <MotiView
        from={{ scale: 1.01, translateX: -4, translateY: -3 }}
        animate={{ scale: 1.075, translateX: 10, translateY: 8 }}
        transition={{
          type: "timing",
          duration: 24000,
          loop: true,
          repeatReverse: true,
        }}
        style={StyleSheet.absoluteFill}
      >
        <NebulaBaseLayer />
      </MotiView>

      <MotiView
        from={{ opacity: 0.95, translateX: 4, translateY: -2 }}
        animate={{ opacity: 1, translateX: -10, translateY: 7 }}
        transition={{
          type: "timing",
          duration: 30000,
          loop: true,
          repeatReverse: true,
        }}
        style={StyleSheet.absoluteFill}
      >
        <MovingMilkyWayLayer />
      </MotiView>

      <MotiView
        from={{ opacity: 0.72, translateX: 6, translateY: -2 }}
        animate={{ opacity: 0.95, translateX: -12, translateY: 8 }}
        transition={{
          type: "timing",
          duration: 26000,
          loop: true,
          repeatReverse: true,
        }}
        style={StyleSheet.absoluteFill}
      >
        <MovingDustLayer />
      </MotiView>

      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#C184B5",
  },
  content: StyleSheet.absoluteFill,
});