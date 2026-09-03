# AegisOps Architecture

## Vision

AegisOps is an AI-powered DevOps and incident-response platform combining cloud-native microservices, Kubernetes, CI/CD, GitOps, observability, DevSecOps and an agentic operations layer.

## End-to-end flow

```text
Developer -> GitHub -> CI/CD -> Container Registry -> GitOps -> Kubernetes
                                                       |
Kubernetes -> Metrics / Logs / Traces -> Alerts -> AI DevOps Agent
                                                       |
                                         Investigation / RCA / Action
                                                       |
                                                Human Approval
                                                       |
                                                Remediation
                                                       |
                                                Verification
```

## Initial components

- frontend: React + TypeScript operations portal
- api-gateway: application API entry point
- user-service: user/profile domain
- order-service: order lifecycle domain
- payment-service: payment workflow domain
- notification-service: event-driven notification domain
- ai-agent: incident investigation and controlled remediation

## Platform layers

1. Application: independently deployable Spring Boot services.
2. Runtime: Docker containers running on Kubernetes.
3. Delivery: GitHub Actions, container registry, Helm and Argo CD.
4. Infrastructure: Terraform-managed AWS resources.
5. Observability: Prometheus, Grafana, Loki and OpenTelemetry.
6. Operations intelligence: Python agent with controlled Kubernetes, Git and observability tools.

## Engineering principles

- Build locally first, then promote to AWS.
- Keep services independently buildable and deployable.
- Treat observability as a first-class requirement.
- Make AI recommendations evidence-backed.
- Require policy checks and human approval for mutating operations initially.
- Make deployments testable and reversible.
