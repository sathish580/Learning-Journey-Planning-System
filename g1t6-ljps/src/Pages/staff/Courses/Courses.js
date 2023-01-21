import React from 'react'
import { CourseData } from './CourseData'
import { Container } from '@mui/material'
import Table from '../../../Components/Table'

export const Courses = () => {

    const headers = ['Course ID', 'Course Name', 'Course Type', 'Course Category']
    const buttons = [[["View Course"]]]
    let rows = []

    for (const course of CourseData) {
        if (course.Course_Status == 'Active') {
            rows.push({
                Course_ID: course.Course_ID,
                Course_Name: course.Course_Name,
                Course_Type: course.Course_Type,
                Course_Category: course.Course_Category,
            })
        }
    }

  return (
    <>
      <Container sx={{ my: 10 }}>
        <Table
        tableName="All Courses"
        headers={headers}
        actionBtns={buttons}
        rows={rows}
        noButtonKey
        buttonPaths = {['/learner/courses']}
      />
      </Container>
    </>
  )
}
