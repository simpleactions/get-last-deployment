import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    const token = (core.getInput('github_token') ||
      process.env.GITHUB_TOKEN) as string

    const octokit = new github.GitHub(token)
    const context = github.context

    const environment = core.getInput('environment')

    const request = await octokit.repos.listDeployments({
      ...context.repo,
      environment
    })

    const deployments = request.data

    if (deployments.length > 0) {
      core.setOutput('deployment_id', deployments[0].id.toString())
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
