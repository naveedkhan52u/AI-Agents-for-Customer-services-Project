import React, { useState } from 'react';
import { KnowledgeDocument, ScreenType } from '../types';

interface KnowledgeBaseViewProps {
  documents: KnowledgeDocument[];
  onAddDocument: (doc: KnowledgeDocument) => void;
  onDeleteDocument: (id: string) => void;
  onShowToast: (msg: string, icon?: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = ({
  documents,
  onAddDocument,
  onDeleteDocument,
  onShowToast,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'pdf' | 'docx' | 'ready' | 'failed'>('all');
  const [docToDelete, setDocToDelete] = useState<KnowledgeDocument | null>(null);
  const [retryingDocId, setRetryingDocId] = useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split('.').pop()?.toLowerCase();
      const type: KnowledgeDocument['type'] =
        ext === 'pdf' ? 'pdf' : ext === 'docx' ? 'docx' : ext === 'csv' ? 'csv' : 'txt';

      const newDoc: KnowledgeDocument = {
        id: `doc-${Date.now()}-${i}`,
        name: file.name,
        type: type,
        size: `${(file.size / 1024).toFixed(0)} KB`,
        uploadDate: 'Just now',
        status: 'ready',
        embeddingsCount: Math.floor(Math.random() * 150) + 40,
      };

      onAddDocument(newDoc);
    }

    onShowToast(`Uploaded ${files.length} document(s). Vectorized into model index.`, 'cloud_sync');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRetry = (doc: KnowledgeDocument) => {
    setRetryingDocId(doc.id);
    setTimeout(() => {
      setRetryingDocId(null);
      doc.status = 'ready';
      doc.embeddingsCount = 110;
      onShowToast(`OCR Parsing succeeded for ${doc.name}!`, 'check_circle');
    }, 1200);
  };

  const handleReindex = (docName: string) => {
    onShowToast(`Re-indexing vector embeddings for ${docName}...`, 'sync');
  };

  const confirmDelete = () => {
    if (docToDelete) {
      onDeleteDocument(docToDelete.id);
      onShowToast(`Removed "${docToDelete.name}" from knowledge base.`, 'delete');
      setDocToDelete(null);
    }
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
    let matchesFilter = true;
    if (activeFilter === 'pdf') matchesFilter = doc.type === 'pdf';
    else if (activeFilter === 'docx') matchesFilter = doc.type === 'docx';
    else if (activeFilter === 'ready') matchesFilter = doc.status === 'ready';
    else if (activeFilter === 'failed') matchesFilter = doc.status === 'failed';

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col w-full pb-16 space-y-4 max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl text-[#0b1c30] font-bold tracking-tight">
              Knowledge Base
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-[#e2dfff] text-[#3323cc]">
              v2.4
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#565e74] mt-0.5">
            Upload and manage approved business documents for factual AI training.
          </p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center justify-center gap-2 bg-[#3525cd] hover:bg-[#4f46e5] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg shadow-xs active:scale-[0.98] transition-all cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">upload_file</span>
          <span>+ Upload Document</span>
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        multiple
        accept=".pdf,.docx,.txt,.csv"
        className="hidden"
      />

      {/* AI Safety Guidance Banner */}
      <div className="bg-[#e2dfff]/40 border border-[#dce9ff] rounded-xl p-3.5 flex items-start gap-3 shadow-2xs">
        <div className="w-8 h-8 rounded-lg bg-[#3525cd] text-white flex items-center justify-center shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified_user
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-[#0f0069]">AI Training Safety Guarantee</h3>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4fdbc8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006d62]"></span>
            </span>
          </div>
          <p className="text-xs text-[#3f465c] mt-0.5 leading-relaxed">
            Your AI agents strictly answer queries using the verified knowledge sources listed below. Unapproved or external web data will never be hallucinated.
          </p>
        </div>
      </div>

      {/* Storage & Vector Indexing Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Storage Usage */}
        <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e5eeff] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#565e74]">Document Storage</span>
            <span className="material-symbols-outlined text-[18px] text-[#3525cd]">folder_open</span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-bold text-[#0b1c30]">
                {documents.length + 9}
              </span>
              <span className="text-xs text-[#565e74]">docs uploaded</span>
            </div>
            <div className="w-full bg-[#dce9ff] h-2 rounded-full overflow-hidden mt-2">
              <div className="bg-[#3525cd] h-full rounded-full transition-all duration-500" style={{ width: '17%' }}></div>
            </div>
            <div className="flex justify-between items-center mt-1.5 text-[11px] text-[#565e74]">
              <span>8.4 MB of 50 MB</span>
              <span className="font-bold text-[#3525cd]">17%</span>
            </div>
          </div>
        </div>

        {/* Vector Synced */}
        <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e5eeff] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#565e74]">Vector Index</span>
            <span className="material-symbols-outlined text-[18px] text-[#006d62]">neurology</span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-bold text-[#0b1c30]">100%</span>
              <span className="text-xs text-[#006d62] font-bold">Synced</span>
            </div>
            <div className="w-full bg-[#dce9ff] h-2 rounded-full overflow-hidden mt-2">
              <div className="bg-[#4fdbc8] h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
            <div className="flex justify-between items-center mt-1.5 text-[11px] text-[#565e74]">
              <span>Latency: &lt;14ms</span>
              <span className="text-[#006d62] font-bold">Realtime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Document Upload Drag & Drop / Tap Target Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="relative group cursor-pointer bg-white hover:bg-[#eff4ff] transition-all rounded-xl p-5 text-center shadow-xs border border-dashed border-[#c7c4d8] hover:border-[#3525cd]"
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-full bg-[#dae2fd] text-[#131b2e] flex items-center justify-center transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#0b1c30]">Tap or drag files to upload directly</p>
            <p className="text-xs text-[#565e74] mt-0.5">Supports PDF, DOCX, TXT, or CSV (Max 25MB each)</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1 text-[11px] bg-[#eff4ff] border border-[#dce9ff] px-2 py-0.5 rounded text-[#464555]">
              <span className="material-symbols-outlined text-[14px]">bolt</span> Instant Chunking
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] bg-[#eff4ff] border border-[#dce9ff] px-2 py-0.5 rounded text-[#464555]">
              <span className="material-symbols-outlined text-[14px]">lock</span> Encrypted at Rest
            </span>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col gap-2.5">
        {/* Search Bar */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#565e74] text-[20px]">
            search
          </span>
          <input
            className="w-full bg-white text-[#0b1c30] text-xs sm:text-sm pl-10 pr-9 py-2.5 rounded-lg shadow-xs border border-[#e5eeff] focus:outline-none focus:ring-2 focus:ring-[#3525cd]"
            placeholder="Search uploaded business documents..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#565e74] hover:text-[#0b1c30]"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
          {[
            { id: 'all', label: `All Types (${documents.length})` },
            { id: 'pdf', label: `PDFs (${documents.filter((d) => d.type === 'pdf').length})` },
            { id: 'docx', label: `DOCX (${documents.filter((d) => d.type === 'docx').length})` },
            { id: 'ready', label: `Synced (${documents.filter((d) => d.status === 'ready').length})` },
            { id: 'failed', label: `Needs Action (${documents.filter((d) => d.status === 'failed').length})` },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setActiveFilter(pill.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-xs transition-all cursor-pointer ${
                activeFilter === pill.id
                  ? 'bg-[#0b1c30] text-white'
                  : 'bg-white text-[#0b1c30] border border-[#e5eeff] hover:bg-[#eff4ff]'
              }`}
              type="button"
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Feed / Stream */}
      <div className="flex flex-col gap-2.5">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl p-3.5 shadow-xs border border-[#e5eeff] transition-all flex flex-col"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    doc.type === 'pdf'
                      ? 'bg-[#ffdad6] text-[#ba1a1a]'
                      : doc.type === 'docx'
                      ? 'bg-[#dae2fd] text-[#131b2e]'
                      : doc.type === 'csv'
                      ? 'bg-[#71f8e4] text-[#00201c]'
                      : 'bg-[#eff4ff] text-[#3525cd]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {doc.type === 'pdf'
                      ? 'picture_as_pdf'
                      : doc.type === 'docx'
                      ? 'description'
                      : doc.type === 'csv'
                      ? 'table_chart'
                      : 'text_snippet'}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-[#0b1c30] truncate">{doc.name}</h4>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs text-[#565e74]">
                    <span className="uppercase text-[10px] bg-[#eff4ff] px-1.5 py-0.2 rounded font-bold border border-[#dce9ff]">
                      {doc.type.toUpperCase()} • {doc.size}
                    </span>
                    <span>Uploaded {doc.uploadDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  aria-label="Delete document"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#565e74] hover:text-[#ba1a1a] hover:bg-[#eff4ff] cursor-pointer"
                  onClick={() => setDocToDelete(doc)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
                {doc.status !== 'failed' && (
                  <button
                    aria-label="Re-index document"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#565e74] hover:text-[#3525cd] hover:bg-[#eff4ff] cursor-pointer"
                    onClick={() => handleReindex(doc.name)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">refresh</span>
                  </button>
                )}
              </div>
            </div>

            {/* Status Footer */}
            {doc.status === 'ready' && (
              <div className="flex items-center justify-between mt-3 pt-2.5 bg-[#eff4ff]/60 -mx-3.5 -mb-3.5 px-3.5 py-2 rounded-b-xl border-t border-[#eff4ff]">
                <div className="flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-[16px] text-[#006d62]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="text-xs font-bold text-[#006d62]">Ready / Indexed</span>
                </div>
                <span className="text-[11px] text-[#565e74]">
                  {doc.embeddingsCount
                    ? `${doc.embeddingsCount} vector embeddings`
                    : doc.decisionNodesCount
                    ? `${doc.decisionNodesCount} decision nodes`
                    : 'Synced'}
                </span>
              </div>
            )}

            {doc.status === 'processing' && (
              <div className="mt-3 pt-2.5 bg-[#eff4ff]/60 -mx-3.5 -mb-3.5 px-3.5 py-2.5 rounded-b-xl border-t border-[#eff4ff]">
                <div className="flex items-center justify-between text-[#565e74] text-xs mb-1.5">
                  <span className="text-[#3525cd] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3525cd] animate-ping"></span>
                    Vectorizing &amp; Chunking...
                  </span>
                  <span>{doc.chunkInfo || 'Chunk 39 / 50'}</span>
                </div>
                <div className="w-full bg-[#dce9ff] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#3525cd] h-full rounded-full transition-all duration-300"
                    style={{ width: `${doc.progressPercent || 78}%` }}
                  ></div>
                </div>
              </div>
            )}

            {doc.status === 'failed' && (
              <div className="flex items-center justify-between mt-3 pt-2.5 bg-[#ffdad6]/40 -mx-3.5 -mb-3.5 px-3.5 py-2 rounded-b-xl border-t border-[#ffdad6]">
                <div className="flex items-center gap-1.5 text-[#ba1a1a]">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  <span className="text-xs font-semibold">
                    Processing Failed ({doc.failureReason || 'OCR parsing timeout'})
                  </span>
                </div>
                <button
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white rounded-md text-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-white transition-all text-xs font-bold shadow-2xs border border-[#ffdad6] cursor-pointer"
                  onClick={() => handleRetry(doc)}
                  type="button"
                >
                  <span
                    className={`material-symbols-outlined text-[14px] ${
                      retryingDocId === doc.id ? 'animate-spin' : ''
                    }`}
                  >
                    replay
                  </span>
                  <span>{retryingDocId === doc.id ? 'Retrying...' : 'Retry'}</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Knowledge Health & Coverage Panel */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-[#e5eeff] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#3525cd]">auto_stories</span>
            <h4 className="text-xs sm:text-sm font-bold text-[#0b1c30]">
              Knowledge Health &amp; Coverage
            </h4>
          </div>
          <span className="text-[10px] text-[#006d62] bg-[#71f8e4]/60 px-2 py-0.5 rounded-full font-bold">
            High Confidence
          </span>
        </div>
        <p className="text-xs text-[#565e74] leading-relaxed">
          Current sources adequately cover 96.8% of inbound customer questions this week. Consider uploading <em>Refund_Policy_2025</em> to resolve edge-case queries.
        </p>
      </div>

      {/* Delete Confirmation Modal */}
      {docToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#dce9ff]">
            <div className="w-11 h-11 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[24px]">delete_forever</span>
            </div>
            <h3 className="text-base font-bold text-[#0b1c30]">Remove Document?</h3>
            <p className="text-xs text-[#565e74] mt-1 leading-relaxed">
              Are you sure you want to delete <span className="font-bold text-[#0b1c30]">{docToDelete.name}</span>? The AI will immediately lose access to this factual index and may decline related customer inquiries.
            </p>
            <div className="flex items-center justify-end gap-2.5 mt-5">
              <button
                className="px-4 py-2 rounded-lg text-xs font-semibold text-[#565e74] hover:bg-[#eff4ff] cursor-pointer"
                onClick={() => setDocToDelete(null)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg text-xs font-bold bg-[#ba1a1a] text-white hover:bg-[#93000a] shadow-xs active:scale-98 cursor-pointer"
                onClick={confirmDelete}
                type="button"
              >
                Remove Knowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
