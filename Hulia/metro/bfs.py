def bfs_trt(graph, start:str, finish:str): #BFS that finds TIME, ROUTE, TRANSFERS 

    visited = {} # "NAME": "TRAVEL_TIME"
    visited[start] = 0

    time = []

    queue = []
    queue.append(start)

    transfers = 0
    is_route_exist = False

    while queue:
        station = queue.pop(0)
        neighbours = graph[station]["neighbours"]

        for neig in neighbours:
            if neig not in visited:
                visited[neig] = visited[station] + neighbours[neig]
                queue.append(neig)

                if neig == finish:
                    is_route_exist = True

    if not is_route_exist:
        return -1 #route not exists

    now = finish
    route = [now]

    while visited[now] > 0:
        neighbours = graph[now]["neighbours"]
        for neig in neighbours:
            time_eq = (visited[neig] == visited[now]-neighbours[neig])
            if time_eq and (neig in visited):
                if graph[now]["line"] != graph[neig]["line"]:
                    transfers += 1
                time.append(neighbours[neig])
                now = neig
                route.append(now)
                break

    result = {
        "time":visited[finish],
        "route":list(reversed(route)),
        "transfers": transfers
    }

    return result

    