import { useState } from "react";

const Dropdown = ({ id, options }: { id: string; options: string[] }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    const inputElement = document.getElementById(id) as HTMLInputElement | null; // Asserção de tipo
    if (inputElement) { // Verificação para garantir que não é nulo
      inputElement.value = value; // Atualiza o input associado
    }
    setIsActive(false); // Fecha o dropdown após seleção
  };

  return (
    <div className={`dropdown ${isActive ? "active" : ""}`}>
      <input
        type="text"
        className="textBox"
        id={id}
        placeholder={`Selecione uma opção`}
        value={selectedValue}
        readOnly
        onClick={toggleDropdown}
      />
      <div className={`option ${isActive ? "active" : ""}`}>
        {options.map((option) => (
          <div key={option} data-value={option} onClick={() => handleOptionClick(option)}>
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
