import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {useFormik} from 'formik';
import errorToast from "../../reusableComponent/errorToast";
import successToast from "../../reusableComponent/successToast";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const student_id = localStorage.getItem('student_id');
  const [questions, setquestions] = useState(null) 
  const [questionState, setquestionState] = useState(0) 
  

  const formik = useFormik({
    initialValues: {
        "question":"",
        "answer":"",
        "elective":""
    },
    onSubmit: (data) => {
        if(data.answer==="yes") {
            successToast(`We recommand you to take ${data['elective']}`)
        }
        else {
            if(questionState<questions.length) {
                setquestionState((previousState) =>previousState+1)
            }
            else
            {
             errorToast("Try answering questions properly")
            }
            
       }
}
})

  return (
    <form>
    <Card className={classes.root}>
        <input type="hidden"
                    onChange={formik.handleChange}
                    name="question"
                    value={ questions ? questions[questionState].question : ""}
                    />
                    <input type="hidden"
                    onChange={formik.handleChange}
                    name="elective"
                    value={questions ? questions[questionState].elective : ""}
         />
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
          variant="h5"
        >
          Question
        </Typography>
        <Typography variant="h5" component="h2">
          {props.questions ? props.questions[0].question : ""}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          <FormControl component="fieldset">
            <br></br>
            <FormLabel component="legend">Select Answer</FormLabel>
            <RadioGroup aria-label="answer" 
            name="answer"
            onChange={formik.handleChange}
            value={formik.value.answer}
            >
              <FormControlLabel value="yes" control={<Radio />} label="yes" />
              <FormControlLabel value="no" control={<Radio />} label="no" />
            </RadioGroup>
          </FormControl>
        </Typography>
        <Typography variant="body2" component="p">
         <Button variant="contained" color="primary" type="submit">Submit</Button>
        </Typography>
      </CardContent>
    </Card>
    </form>
  );
}
