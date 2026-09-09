import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// The runner's contract, stubbed: inputs arrive as INPUT_<NAME>
// variables, outputs go to the file GITHUB_OUTPUT names. This is what a
// consumer's runner does; the bundle must not know the difference.
function run(inputs: Record<string, string>) {
  const dir = mkdtempSync(join(tmpdir(), 'action-example-'))
  const output = join(dir, 'output')
  writeFileSync(output, '')
  const env: Record<string, string> = {
    ...process.env,
    GITHUB_OUTPUT: output,
  } as Record<string, string>
  for (const [key, value] of Object.entries(inputs)) {
    env[`INPUT_${key.replace(/ /g, '_').toUpperCase()}`] = value
  }
  const result = spawnSync(process.execPath, ['dist/index.js'], {
    env,
    encoding: 'utf8',
  })
  return { ...result, outputs: readFileSync(output, 'utf8') }
}

describe('dist/index.js under the runner contract', () => {
  it('greets and sets the output', () => {
    const r = run({ name: 'tiefgang' })
    expect(r.status).toBe(0)
    expect(r.stdout).toContain('::notice::hello, tiefgang')
    expect(r.outputs).toContain('greeting')
    expect(r.outputs).toContain('hello, tiefgang')
  })

  it('fails with one error line on an empty name', () => {
    const r = run({ name: '   ' })
    expect(r.status).toBe(1)
    expect(r.stdout).toContain('::error::name must not be empty')
    expect(r.stderr).not.toContain('at ') // no stack trace
  })
})
