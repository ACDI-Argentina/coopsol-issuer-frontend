import { Button } from 'antd';


const commonStyle = {
  height: "50px",
  borderRadius: "11px",
  width: "max-content",
  padding: "0.5em 2em",
  border: "none",
  cursor: "pointer",
  boxSizing: "border-box",
  boxShadow: "2px 4px 11px rgba(14, 168, 155, 0.15)",
  fontFamily: "poppins-bold",
  fontSize: "14px",
  fontWeight: "400"
}
const primaryStyle = {
  ...commonStyle,
  background: "#ffcd33",
  color: "white",
};

const disabledStyle = {
  ...commonStyle,
  color: "#979797",
  backgroundColor: "#f3f3f3",
  border: "1px solid #f3f3f3",
  cursor: "default",
};



const ButtonAntd = ({ disabled, ghost, loading, danger, children, ...props }) => {

  const getStyle = () => {

    if(disabled){
      return disabledStyle;
    }
    return {
      ...primaryStyle
    }

  }

  return (
    <Button
    
      style={getStyle()}
      disabled={disabled}
      ghost={ghost}
      loading={loading}
      danger={danger}
      type="submit"
      
      {...props}
    >
      {children}
    </Button>
  )
}
export default ButtonAntd;