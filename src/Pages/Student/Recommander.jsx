import React,{ useEffect, useState }from 'react';
import QuestionCard from './questionCard';
import axios from 'axios';
import '../style.css'
import { makeStyles } from "@material-ui/core/styles";
import {useFormik} from 'formik';
import errorToast from "../../reusableComponent/errorToast";
import successToast from "../../reusableComponent/successToast";
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

function Recommander() {

    const student_id = localStorage.getItem('student_id');
    const [questions, setquestions] = useState(null) 
    const [questionState, setquestionState] = useState(0) 
  
    useEffect(() => { 
      axios
        .get(`/electives/questions/${student_id}`)
        .then((response) => {
          console.log(response.data);
          setquestions(response.data)
        })
        .catch((err) => {
          console.log(err);
         
        });
    },[]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            "question":questions ? questions[questionState].question : "" ,
            "answer":"",
            "elective":questions ?  questions[questionState].subject_name :""
        },
        
        onSubmit: (data) => {
            
            console.log(data)
            if(data.answer==="yes") {
                successToast(`We recommand you to take ${data['elective']}`)
              
            }
            else {
                if(questionState<(questions.length-1)) {
                    
                    setquestionState((previousState)=>previousState+1)
                    
                }
                else
                {
                console.log("back to initial state")
                 setquestionState(0)   
                 errorToast("Try answering questions properly")
                }
                console.log(questionState);
                
           }
  }
})

    return (
        
        <div>
            <center>
                <h1>Elective Recommander</h1>
    <form onSubmit={formik.handleSubmit}>
    <Card >
        <input type="hidden"
                    onChange={formik.handleChange}
                    name="question"
                    value={formik.values.question}
                    />
        <input type="hidden"
                    onChange={formik.handleChange}
                    name="elective"
                    value={formik.values.elective}
         />
      <CardContent>
        <Typography
        //   className={classes.title}
          color="textSecondary"
          gutterBottom
          variant="h5"
        >
          Question
        </Typography>
        <Typography variant="h5" component="h2">
          {questions ? questions[questionState].question : ""}
        </Typography>
        <Typography  color="textSecondary">
          <FormControl component="fieldset">
            <br></br>
            <FormLabel component="legend">Select Answer</FormLabel>
            <RadioGroup aria-label="answer" 
            name="answer"
            required
            onChange={formik.handleChange}
            value={formik.values.answer}
            
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
                
            </center>
        </div>
    )
}

export default Recommander
