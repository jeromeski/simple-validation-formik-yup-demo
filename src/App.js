
import { useState } from "react";
import "./styles.css";

import {Formik, Form, Field, ErrorMessage,} from 'formik';
import * as Yup from 'yup';

export default function App() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })
  const [currentStep, setCurrentStep] = useState(0);


  const makeRequest = (formData) => {
    console.log("data", formData)
  }

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({...prev, ...newData}))
    
    if(final) {
      makeRequest(newData)
      return
    }

    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevStep = (newData) => {
    setData((prev) => ({...prev, ...newData}))
    setCurrentStep((prev) => prev - 1)
  }

  const steps = [
    <StepOne next={handleNextStep} data={data}/>,
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={data}/>
  ];

  console.log(data)

  return (
    <div className="App">
      {steps[currentStep]}
    </div>
  );
}

const stepOneValidationSchema = Yup.object({
  firstName: Yup.string().required().label('First name'),
  lastName: Yup.string().required().label('Last name')
})


const StepOne = (props) => {
  const {next, data} = props;

  const handleSubmit = (values) => {
    next(values)
  }

  return(
    <Formik
      validationSchema={stepOneValidationSchema}
      initialValues={data}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <p>First Name:</p>
          <Field name='firstName' />
          <ErrorMessage name='firstName' />
          <p>Last Name:</p>
          <Field name='lastName' />
          <ErrorMessage name='lastName' />
          <button className='btn' type="submit">Next</button>
        </Form>
      )}
    </Formik>
  )
}

const stepTwoValidationSchema = Yup.object({
  email: Yup.string().required().label('email'),
  password: Yup.string().required().label('Password')
})

const StepTwo = (props) => {
  const {next, prev, data} = props;

  const handleSubmit = (values) => {
    next(values, true)
  }
  
  return(
    <Formik 
      validationSchema={stepTwoValidationSchema}
      initialValues={data} 
      onSubmit={handleSubmit}>
      {({values}) => (
        <Form>
          <p>Email:</p>
          <Field name='email' />
          <ErrorMessage name='email' />
          <p>Password:</p>
          <Field name='password' />
          <ErrorMessage name='password'/>
          <button className='btn' type="button" onClick={() => prev(values)}>Back</button>
          <button className='btn' type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )
}

