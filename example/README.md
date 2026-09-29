# tiefgang example

The contract template for tiefgang's actions. It echoes an input to an
output so the module contract — lint, coverage, the committed bundle,
the drift gate, the functional test — exists before the first real
action. Not for use in a real workflow; copy it to start a new action.

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

This directory is developed in the tiefgang monorepo and mirrored here;
see the repository README. `make check` there runs lint, the unit
suite with its coverage gate, the drift gate that fails when the
committed `dist/index.js` differs from a fresh build, and a functional
test that runs the committed bundle under the runner's environment
contract. It never writes the bundle; `make build` does.
