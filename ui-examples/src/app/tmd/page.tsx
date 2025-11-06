"use client"
import useSWR from 'swr';
import { useState, useRef, useCallback, Fragment } from "react";

type Entry = {
  id: string;
  label: string;
}

type QuestionData = {
  label: string;
  id: string;
  options: Entry[]
}

type MetricsData = {
  label: string;
  id: string;
  options: Entry & {
    count: number;
  }[]
}

type Result<T> = {
  values: T[]
}

async function fetchMetrics([apiRoot, questionset, questions]: [string, string, string[]]): Promise<Result<MetricsData>> {
  console.log(questions)
  return await (await fetch(`${apiRoot}/metrics/set/${questionset}?${questions.map(q => `questions=${q}`).join("&")}`)).json()
}

async function fetchQuestions([apiRoot, questionset]: [string, string[]]): Promise<Result<QuestionData>> {
  return await (await fetch(`${apiRoot}/properties/set/${questionset}`)).json()
}

const viewAlternatives: Entry[] = [
  {label: "Questions", id: "questions"},
  {label: "Metrics", id: "metrics"},
]

const questionsets: Entry[] = [
  {label: "Quality", id: "quality"},
  {label: "Impact", id: "impact"},
  {label: "Demographic", id: "demographic"},
]

const questionsetIds = questionsets.map(q => q.id)

export default function Home() {
  const [apiRoot, setAPIRoot] = useState("http://localhost:8000")
  const [view, setView] = useState("questions")
  const [questionset, setQuestionset] = useState(questionsets[0].id);
  const [questions, setQuestions] = useState(["quality-used_resources_before", "quality-used_resources_future"]);
  const {data: questionData, error: questionError, isLoading: questionLoading} = useSWR([apiRoot, questionset], fetchQuestions);
  const {data, error: dataError, isLoading: dataLoading} = useSWR([apiRoot, questionset, questions], fetchMetrics);
  const apiRootInputRef = useRef<HTMLInputElement>(null);
  const updateRoot = useCallback(() => {
    const input = apiRootInputRef.current;
    if (input) {
      setAPIRoot(input.value)
    }
  }, [apiRootInputRef, setAPIRoot])
  console.log(data, dataError, dataLoading)
  console.log(questionData, questionError, questionLoading)
  return (
    <div className="container">
      <h2>TMD API Example</h2>
      <div className="row mb-3">
        <div className="col">
          <div className="input-group">
            <input type="text" ref={apiRootInputRef} name="api-root" defaultValue={apiRoot} />
            <button className="btn btn-primary" type="button" onClick={updateRoot}>Change Root</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            {viewAlternatives.map(v => (
              <button key={v.id} type="button" className={`btn btn-primary ${v.id === view ? "active" : ""}`} data-bs-toggle="button" aria-pressed={v.id === view} onClick={() => setView(v.id)}>{v.label}</button>
            ))}
          </div>
        </div>
        <div className="col">
          <select className="form-select" value={questionset} onChange={(event) => {setQuestionset(event.target.value)}}>
            {questionsets.map(qs => (
              <option key={qs.id} value={qs.id}>{qs.label}</option>
            ))}
          </select>
        </div>
      </div>
      <hr />
      {view === "questions" && (
        <>
          <h3>{questionsets.find((e) => e.id === questionset)?.label} question descriptions</h3>
          {questionData && questionData.values.map(question => (
            <div className="row" key={question.id}>
              <div className="col">
                <h4>{question.label}</h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Label</th>
                    </tr>
                  </thead>
                  <tbody>
                    {question.options.map(option => (
                      <tr key={option.id}>
                        <th>{option.id}</th>
                        <td>{option.label}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
      </>)}
      {view === "metrics" && (
        <>
          <h3>Metrics view</h3>
          
        </>
      )}
    </div>
  )
}
