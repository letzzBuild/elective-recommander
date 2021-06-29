import Typography from "@material-ui/core/Typography";
// import Container from "@material-ui/core/Container";

export default function Header(props) {
  return (
    <>
      
        <Typography style={{fontSize:30,fontWeight:'bold',fontFamily:"Josefin Sans, cursive"}}>{props.data}</Typography>
   
    </>
  );
}
