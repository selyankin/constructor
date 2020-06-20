import React, {useState} from 'react';
import './App.css';
import * as SRD from "storm-react-diagrams"
import "storm-react-diagrams/dist/style.min.css";
import Modal from 'react-modal';



const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : '#fff',
    borderRadius          : '20px',
    width                 : '390px',
    padding               : '40px',
  }
};
let A = 1;

var engine = new SRD.DiagramEngine();
engine.installDefaultFactories();

// 2) setup the diagram model
var model = new SRD.DiagramModel();

function App() {
  const [modalIsOpen,setIsOpen] = useState(false);
  const [nodeName,setNodeName] = useState('');
  const [componentXY,setComponentXY] = useState([100,100]);
  const [selectedOption, setSelectedOption] = useState(' ');
  const [selectedOptionColor, setSelectedOptionColor] = useState(' ');

  engine.setDiagramModel(model);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
  }

  function closeModal(){
    setIsOpen(false);
  }


// 7) load model into engine

  function addNode() {
    if (selectedOption === ''){
      alert('Выберите тип элемента');
      return false;
    }
    let text = ": \n" + nodeName;
    if (selectedOption !== 'AND' && selectedOption !== 'OR' && selectedOption !== 'XOR') {
      if (nodeName === '') {
        alert('Введите текст');
        return false;
      }
    }
    else{
      text = '';
    }
    if (selectedOption === 'A'){
      text = A + '\n' + nodeName;
      A++;
    }
    setNodeName('');
    setSelectedOption('');
    let element = new SRD.DefaultNodeModel(selectedOption + text, selectedOptionColor);
    element.setPosition(-model.getOffsetX() + componentXY[0], -model.getOffsetY() + componentXY[1]);
    element.addOutPort(" ");
    element.addInPort(' ');
    model.addNode(element);
    closeModal();
  }

  function rightClick(e) {
    e.preventDefault();
    console.log(model.getNodes());
    setComponentXY([e.clientX,e.clientY]);
    openModal();
  }

  function onValueChange(event) {
      setSelectedOption(event.target.value);
      let color = event.target.value;
      switch (color) {
        case 'Функция':
          color = "rgb(127,255,127)";
          break;
        case 'Событие':
          color = "rgb(247,187,240)";
          break;
        case 'AND':
          color = "rgb(230,230,230)";
          break;
        case 'OR':
          color = "rgb(230,230,230)";
          break;
        case 'XOR':
          color = "rgb(230,230,230)";
          break;
        case 'Субъект':
          color = "rgb(250,255,128)";
          break;
        case 'A':
          color = "rgb(255,255,255)";
          break;
        case 'ИС':
        case 'Модуль ИС':
          color = "rgb(244,173,115)";
          break;
        case 'Термин':
          color = "rgb(230,230,230)";
          break;
        default:
          color = "rgb(175,193,218)";
          break;
      }
      setSelectedOptionColor(color);
  }

  return (
    <div onContextMenu={e => rightClick(e)} className="App">
      <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
      >
        <div id="RightClose">
          <h2>Add component</h2>
          <button onClick={closeModal}>close</button>
        </div>
          <p>Текст компонента:</p>
          <input onChange={e => setNodeName(e.target.value)} className={'full-size-input'} type="text"/>
        <p>Выбор типа компонента:</p>
        <div className="component-choice">
          <label>
            <input
                type="radio"
                value="AND"
                checked={selectedOption === "AND"}
                onChange={event => onValueChange(event)}
            />
            <img alt="" width={"45px"} src="https://www.businessstudio.ru/wiki/docs/v4/lib/exe/fetch.php/ru/csdesign/bpmodeling/epc_notation/epc_notation_078.png"/>
          </label>
          <label>
            <input
                type="radio"
                value="OR"
                checked={selectedOption === "OR"}
                onChange={event => onValueChange(event)}
            />
            <img alt="" width={"45px"} src="https://www.businessstudio.ru/wiki/docs/v4/lib/exe/fetch.php/ru/csdesign/bpmodeling/epc_notation/epc_notation_088.png"/>
          </label>
          <label>
            <input
                type="radio"
                value="XOR"
                checked={selectedOption === "XOR"}
                onChange={event => onValueChange(event)}
            />
            <img alt="" width={"45px"} src="https://www.businessstudio.ru/wiki/docs/v4/lib/exe/fetch.php/ru/csdesign/bpmodeling/epc_notation/epc_notation_096.png"/>
          </label>
        <label>
          <input
              type="radio"
              value="Функция"
              checked={selectedOption === "Функция"}
              onChange={event => onValueChange(event)}
          />
          <img alt="" src="https://www.businessstudio.ru/wiki/docs/v4/lib/exe/fetch.php/ru/csdesign/bpmodeling/epc_notation/epc_notation_072.png"/>
        </label>
        <label>
          <input
              type="radio"
              value="Событие"
              checked={selectedOption === "Событие"}
              onChange={event => onValueChange(event)}
          />
          <img alt="" src="https://www.businessstudio.ru/wiki/docs/v4/lib/exe/fetch.php/ru/csdesign/bpmodeling/epc_notation/epc_notation_074.png"/>
        </label>

          <label>
            <input
                type="radio"
                value="A"
                checked={selectedOption === "A"}
                onChange={event => onValueChange(event)}
            />
            <img alt="" src="https://www.businessstudio.ru/wiki/docs/v4/lib/exe/fetch.php/ru/csdesign/bpmodeling/epc_notation/epc_notation_104.png"/>
          </label>
          <label>
            <input
                type="radio"
                value="Субъект"
                checked={selectedOption === "Субъект"}
                onChange={event => onValueChange(event)}
            />
            <img alt="" src="https://www.businessstudio.ru/wiki/docs/v4/lib/exe/fetch.php/ru/csdesign/bpmodeling/epc_notation/epc_notation_112.png"/>
          </label>
          <label>
            <input
                type="radio"
                value="Бумажный документ"
                checked={selectedOption === "Бумажный документ"}
                onChange={event => onValueChange(event)}
            />
            <img alt="" src="https://www.businessstudio.ru/wiki/docs/v4/lib/exe/fetch.php/ru/csdesign/bpmodeling/epc_notation/epc_notation_114.png"/>
          </label>
          <label>
            <input
                type="radio"
                value="Электронный документ"
                checked={selectedOption === "Электронный документ"}
                onChange={event => onValueChange(event)}
            />
            <img alt="" src="https://www.businessstudio.ru/wiki/docs/v4/lib/exe/fetch.php/ru/csdesign/bpmodeling/epc_notation/epc_notation_116.png"/>
          </label>
          <label>
            <input
                type="radio"
                value="ТМЦ"
                checked={selectedOption === "ТМЦ"}
                onChange={event => onValueChange(event)}
            />
            <img alt="" src="https://www.businessstudio.ru/wiki/docs/v4/lib/exe/fetch.php/ru/csdesign/bpmodeling/epc_notation/epc_notation_118.png"/>
          </label>
          <label>
            <input
                type="radio"
                value="Информация"
                checked={selectedOption === "Информация"}
                onChange={event => onValueChange(event)}
            />
            <img alt="" src="https://www.businessstudio.ru/wiki/docs/v4/lib/exe/fetch.php/ru/csdesign/bpmodeling/epc_notation/epc_notation_120.png"/>
          </label>
          <label>
            <input
                type="radio"
                value="ИС"
                checked={selectedOption === "ИС"}
                onChange={event => onValueChange(event)}
            />
            <img alt="" src="https://www.businessstudio.ru/wiki/docs/v4/lib/exe/fetch.php/ru/csdesign/bpmodeling/epc_notation/epc_notation_122.png"/>
          </label>
          <label>
            <input
                type="radio"
                value="Модуль ИС"
                checked={selectedOption === "Модуль ИС"}
                onChange={event => onValueChange(event)}
            />
            <img alt="" src="https://www.businessstudio.ru/wiki/docs/v4/lib/exe/fetch.php/ru/csdesign/bpmodeling/epc_notation/epc_notation_124.png"/>
          </label>
          <label>
            <input
                type="radio"
                value="Функция ИС"
                checked={selectedOption === "Функция ИС"}
                onChange={event => onValueChange(event)}
            />
            <img alt="" src="https://www.businessstudio.ru/wiki/docs/v4/lib/exe/fetch.php/ru/csdesign/bpmodeling/epc_notation/epc_notation_126.png"/>
          </label>
          <label>
            <input
                type="radio"
                value="База данных"
                checked={selectedOption === "База данных"}
                onChange={event => onValueChange(event)}
            />
            <img alt="" src="https://www.businessstudio.ru/wiki/docs/v4/lib/exe/fetch.php/ru/csdesign/bpmodeling/epc_notation/epc_notation_128.png"/>
          </label>
          <label>
            <input
                type="radio"
                value="Термин"
                checked={selectedOption === "Термин"}
                onChange={event => onValueChange(event)}
            />
            <img alt="" src="https://www.businessstudio.ru/wiki/docs/v4/lib/exe/fetch.php/ru/csdesign/bpmodeling/epc_notation/epc_notation_130.png"/>
          </label>
          <label>
            <input
                type="radio"
                value="Набор объектов"
                checked={selectedOption === "Набор объектов"}
                onChange={event => onValueChange(event)}
            />
            <img alt="" src="https://www.businessstudio.ru/wiki/docs/v4/lib/exe/fetch.php/ru/csdesign/bpmodeling/epc_notation/epc_notation_134.png"/>
          </label>
          <label>
            <input
                type="radio"
                value="Прочее"
                checked={selectedOption === "Прочее"}
                onChange={event => onValueChange(event)}
            />
            <img alt="" src="https://www.businessstudio.ru/wiki/docs/v4/lib/exe/fetch.php/ru/csdesign/bpmodeling/epc_notation/epc_notation_136.png"/>
          </label>
        </div>
          <div onClick={addNode} className={'full-size-button'}>Add</div>
      </Modal>
      <SRD.DiagramWidget diagramEngine={engine} />
    </div>
  );
}

export default App;
