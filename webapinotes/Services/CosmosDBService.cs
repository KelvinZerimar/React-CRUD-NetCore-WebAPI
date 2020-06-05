 using System.Collections.Generic;
 using System.Linq;
 using System.Threading.Tasks;
 using webapinotes.Models;
 using Microsoft.Azure.Cosmos;

namespace webapinotes.Services
{
    public class CosmosDbService : ICosmosDbService
    {
        private Container _container;

        public CosmosDbService(
            CosmosClient dbClient,
            string databaseName,
            string containerName)
        {
            this._container = dbClient.GetContainer(databaseName, containerName);
        }
        
        public async Task AddItemAsync(Note item)
        {
            await this._container.CreateItemAsync<Note>(item, new PartitionKey(item.Id));
        }

        public async Task DeleteItemAsync(string id)
        {
            await this._container.DeleteItemAsync<Note>(id, new PartitionKey(id));
        }

        public async Task<Note> GetItemAsync(string id)
        {
            try
            {
                ItemResponse<Note> response = await this._container.ReadItemAsync<Note>(id, new PartitionKey(id));
                return response.Resource;
            }
            catch(CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            { 
                return null;
            }

        }

        public async Task<IEnumerable<Note>> GetItemsAsync(string queryString)
        {
            var query = this._container.GetItemQueryIterator<Note>(new QueryDefinition(queryString));
            List<Note> results = new List<Note>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                
                results.AddRange(response.ToList());
            }

            return results;
        }

        public async Task UpdateItemAsync(string id, Note item)
        {
            await this._container.UpsertItemAsync<Note>(item, new PartitionKey(id));
        }
    }
}