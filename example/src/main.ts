import * as core from '@actions/core'
import { greet } from './greet'

// Every failure goes through setFailed: a non-zero exit and one
// ::error:: line, never a stack trace in the consumer's log (actions.md §2.3).
try {
  const greeting = greet(core.getInput('name'))
  core.notice(greeting)
  core.setOutput('greeting', greeting)
} catch (err) {
  core.setFailed(err instanceof Error ? err.message : String(err))
}
