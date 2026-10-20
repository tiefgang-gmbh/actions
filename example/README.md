# tiefgang example

A template for tiefgang's actions. It echoes an input to an output and
carries what every JavaScript action here has: its sources, a unit
test, the committed bundle the runner executes, and a functional test
that runs that bundle. Not for use in a real workflow.

## Usage

```yaml
- uses: tiefgang-gmbh/actions/example@v0
  id: hello
  with:
    name: tiefgang
- run: echo "${{ steps.hello.outputs.greeting }}"
```

## Inputs

| input  | required | default | description                                 |
| ------ | -------- | ------- | ------------------------------------------- |
| `name` | no       | `world` | Who to greet. An empty name fails the step. |

## Outputs

| output     | description     |
| ---------- | --------------- |
| `greeting` | `hello, <name>` |

## Development

This directory is developed in tiefgang's monorepo and mirrored here;
see the repository README. `dist/index.js` is built from `src/` and
committed, so a runner executes it with nothing installed, and every
change is checked against a fresh build of the sources before it is
merged.
