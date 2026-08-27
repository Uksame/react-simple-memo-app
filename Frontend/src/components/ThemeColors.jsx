import "./ThemeColors.css";
import { useState } from "react";

export default function ThemeColors({ themeColors, setThemeColors }) {
  const [selectedColor, setSelectedColor] = useState("primary");

  const handleColorChange = (colorType, index, value) => {
    setThemeColors((prevColors) => ({
      ...prevColors,
      [colorType]: prevColors[colorType].map((c, i) =>
        i === index ? Number(value) : c
      ),
    }));
  };

  return (
    <div className="ThemeColors">
      <h3>Themes</h3>
      <select onChange={(e) => setSelectedColor(e.target.value)}>
        <option value="primary">Primary</option>
        <option value="secondary">Secondary</option>
        <option value="accent">Accent</option>
        <option value="font">Font</option>
      </select>
      <ColorPicker
        color={themeColors[selectedColor]}
        onChange={(index, value) =>
          handleColorChange(selectedColor, index, value)
        }
        selectedColor={selectedColor} // Pass selected color type
      />
    </div>
  );
}

function ColorPicker({ color, onChange, selectedColor }) {
  const labels =
    selectedColor === "accent"
      ? ["Hue", "Saturation", "Light", "Alpha"]
      : ["Red", "Green", "Blue", "Opacity"];

  const maxValues =
    selectedColor === "accent" ? [360, 100, 100, 1] : [255, 255, 255, 1];

  const steps = selectedColor === "accent" ? [1, 1, 1, 0.01] : [1, 1, 1, 0.01];

  return (
    <div className="ColorPicker">
      {labels.map((label, index) => (
        <div className="picker" key={label}>
          <span>{label}</span>
          <input
            type="range"
            min={index === 3 ? 0 : 0}
            max={maxValues[index]}
            step={steps[index]}
            value={color[index]}
            onChange={(e) => onChange(index, e.target.value)}
          />
          <span>{color[index]}</span>
        </div>
      ))}
    </div>
  );
}
