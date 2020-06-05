using System.Collections.Generic;
using System.Threading.Tasks;
using webapinotes.Models;

namespace webapinotes.Services
{
    public interface ICosmosDbService
    {
        Task<IEnumerable<Note>> GetItemsAsync(string query);
        Task<Note> GetItemAsync(string id);
        Task AddItemAsync(Note item);
        Task UpdateItemAsync(string id, Note item);
        Task DeleteItemAsync(string id);
    }
}