# CICDtest
Argocd test
minikube start
kubectl port-forward svc/argocd-server -n argocd 8081:80
kubectl logs -f -l app.kubernetes.io/instance=updater -n argocd
terraform init
terraform apply
kubectl apply -f 1-example/repo-secret.yaml
kubectl apply -f 1-example/secret.yaml
kubectl apply -f 1-example/application.yaml