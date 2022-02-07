import './Button.css';

const Button = (props) => {
    return (
        <div className='buttonGroup'>
            <button onClick={props.onClick}>{props.name}</button>
        </div>
    )
}

export default Button;
