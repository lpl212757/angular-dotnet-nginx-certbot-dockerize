FROM mcr.microsoft.com/dotnet/sdk:7.0 as build-env

WORKDIR ./app
COPY ./server.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish "server.csproj" -c Release -o ./publish

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
COPY --from=build-env ./app/publish ./app/publish
WORKDIR ./app/publish
EXPOSE 80
ENTRYPOINT ["dotnet", "server.dll"]
