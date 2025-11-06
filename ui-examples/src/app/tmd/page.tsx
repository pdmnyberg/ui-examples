"use client"
import useSWR from 'swr';
import { useState, useRef, useCallback, ChangeEventHandler, useEffect } from "react";

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
  options: (Entry & {
    count: number;
  })[]
}

type Result<T> = {
  values: T[]
}

async function fetchMetrics([apiRoot, questions]: [string, string[]]): Promise<Result<MetricsData>> {
  return await (await fetch(`${apiRoot}/metrics/questions?${Array.from(questions).map(q => `ids=${q}`).join("&")}`)).json()
}

async function fetchQuestions([apiRoot, questionset]: [string, string[]]): Promise<Result<QuestionData>> {
  return await (await fetch(`${apiRoot}/properties/sets?ids=${questionset}`)).json()
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

export default function Home() {
  const [apiRoot, setAPIRoot] = useState("http://localhost:8000")
  const [view, setView] = useState("questions")
  const [questionset, setQuestionset] = useState(questionsets[0].id);
  const [questions, setQuestions] = useState<Set<string>>(new Set());
  const {data: questionData, error: questionError, isLoading: questionLoading} = useSWR([apiRoot, questionset], fetchQuestions);
  const {data, error: dataError, isLoading: dataLoading} = useSWR([apiRoot, questions], fetchMetrics);
  const apiRootInputRef = useRef<HTMLInputElement>(null);
  const updateRoot = useCallback(() => {
    const input = apiRootInputRef.current;
    if (input) {
      setAPIRoot(input.value)
    }
  }, [apiRootInputRef, setAPIRoot])
  const handleQuestionChoice = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
    const entryId = event.target.getAttribute("data-entry-id");
    const checked = event.target.checked;
    if (entryId) {
      setQuestions((questions) => {
        if (checked) {
          questions.add(entryId)
        } else {
          questions.delete(entryId)
        }
        return new Set(questions)
      })
    }
  }, [setQuestions])
  useEffect(() => {
    setQuestions(new Set())
  }, [questionset])
  console.log(data, dataError, dataLoading)
  console.log(questionData, questionError, questionLoading)
  return (
    <div className="container">
      <h2>TMD API Example</h2>
      <div className="row my-3">
        <div className="col">
          <div className="input-group">
            <input type="text" ref={apiRootInputRef} name="api-root" defaultValue={apiRoot} />
            <button className="btn btn-primary" type="button" onClick={updateRoot}>Change Root</button>
          </div>
        </div>
      </div>
      <div className="row my-3">
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
      {view === "metrics" && questionData && (
        <div className="row my-3">
          {questionData.values.map(question => (
            <div className="col-2" key={question.id}>
              <input className="form-check-input" type="checkbox" id={question.id} data-entry-id={question.id} onChange={handleQuestionChoice} checked={questions.has(question.id)}/>
              <label htmlFor={question.id}>{question.label}</label>
            </div>
          ))}
        </div>
      )}
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
          {data && data.values.map(question => (
            <div className="row" key={question.id}>
              <div className="col">
                <h4>{question.label}</h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Label</th>
                      <th scope="col">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {question.options.map(option => (
                      <tr key={option.id}>
                        <th>{option.id}</th>
                        <td>{option.label}</td>
                        <td>{option.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
