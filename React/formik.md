# formik

# formik이란?
formik은 다음과 같은 부분을 쉽게 처리하도록 도와준다. 
> 1. form 내/외부로부터 상태 값을 가져온다. 
> 2. validation과 error message
> 3. form submit 처리

위와 같은 것들을 한 곳에서 처리할 수 있도록 함으로써 테스트, 리팩터링 등이 용이하다.

Formik은 form의 상태를 추적하고, 노출하며 몇 가지 재사용 가능한 method들과 event handler(handleChange, handleBlur, handleSubmit)을 추가한다.

### event handler
- handleBlur : 객체가 focus를 잃었을 때 발생시킬 이벤트. `onBlur` 의 이벤트 핸들러이다.
- handleChange : 일반적인 input change를 다루는 이벤트 핸들러이다. 
- handleSubmit : submit handler이다.

``` javascript
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const Basic = () => (
  <div>
    <h1>Basic Formik</h1>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={
        values => {
          const errors = {}
          if (!values.email) {
            errors.email = 'Required'
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
          }
          return errors
        }
      }
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
    >
    {({ isSubmitting }) => (
      <Form>
        <Field type="email" name="email" />
        <ErrorMessage name="email" component="div" />
        <Field type="password" name="password" />
        <ErrorMessage name="password" component="div" />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    )}
    </Formik>
  </div>
)

export default Basic
```